import { Model } from 'mongoose';

export type IReview = {
  review: string;
  userEmail: string;
  userName: string;
  bookId: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;


export type IReviewFilters = {
  searchTerm?: string;
  _id?: string;
  title?: string;
  author?: string;
  genre?: string;
};
