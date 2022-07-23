import express from "express";

import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middleware/error.js";
const app = express();

app.use(express.json());

const URL = "/api/v1";

app.use(`${URL}/products`, productRoute);
app.use(`${URL}/users`, userRoute);
app.use(errorMiddleware);

export default app;
