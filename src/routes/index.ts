import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.redirect("/catalog");
});

export default router;
