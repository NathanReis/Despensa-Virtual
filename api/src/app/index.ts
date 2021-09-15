import express from 'express';
import { router } from '../routes/products';
import "reflect-metadata";

const app = express();

app.use("/", express.json());
app.use("/teste", router);

export default app;
