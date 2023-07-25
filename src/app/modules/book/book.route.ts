import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/updated-books', BookController.UpdatedBooks);

router.get('/:id', BookController.getSingleBook);
router.post('/', BookController.createBook);

// router.delete('/:id', BookController.deleteBook);

// router.patch(
//   '/:id',
//   validateRequest(BookValidationSchema.updateBookZodSchema),
//   BookController.updateBook
// );

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
