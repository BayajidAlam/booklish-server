import { Model, Types } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  _id?: string;
  title?: string;
  author?: string;
  genre?: string;
};
