import express from 'express';
import { router } from '../routes/products';
import "reflect-metadata";
import { catchErrors } from '../middlewares/CatchErrors';
// import "express-async-errors";

const app = express();

app.use("/", express.json());
app.use("/produto", router);
// app.use(catchErrors);
export default app;
