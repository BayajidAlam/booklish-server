import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const ReviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
