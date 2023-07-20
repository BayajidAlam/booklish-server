import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    genre: {
      type: 'string',
      required: true,
    },
    publicationDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
