import express from 'express';
import { ReviewController } from './review.controller';


const router = express.Router();

router.post(
  '/:id',
  ReviewController.createReview
);

router.get('/:id', ReviewController.getSingleReview);

router.get('/', ReviewController.getAllReviews);

export const ReviewRoutes = router;