import express from 'express';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    // route: BooksRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
