import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBook, IBookFilters } from './book.interface';
import { BookSearchableFields } from './book.constant';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(book);

  if (!createdBook) {
    throw new Error('Failed to create Book !');
  }
  return createdBook;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  // dynamic searching
  if (searchTerm) {
    andCondition.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // dynamic filtering
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const UpdatedBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find().sort({ _id: -1 }).limit(10);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id });
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOneAndDelete({ _id: id });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }
  console.log(id, payload);

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  UpdatedBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
