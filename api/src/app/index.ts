import express from 'express';
import "express-async-errors";
import "reflect-metadata";
import { catchErrors } from '../middlewares/CatchErrors';
import { router } from '../routes/products';

const app = express();

app.use("/", express.json());
app.use("/produto", router);
app.use(catchErrors);

export default app;
