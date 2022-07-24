import express from "express";

import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middleware/error.js";
import auth from "./middleware/checkAuth.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import checkAuth from "./middleware/checkAuth.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

const URL = "/api/v1";

app.use(`${URL}/products`, checkAuth.isUserAuthenticated, productRoute);
app.use(`${URL}/users`, userRoute);
app.use(errorMiddleware);

export default app;
