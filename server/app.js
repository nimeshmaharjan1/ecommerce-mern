import express from "express";

import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import auth from "./middleware/checkAuth.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const URL = "/api/v1";

app.use(`${URL}/products`, productRoute);
app.use(`${URL}/users`, userRoute);
app.use(`${URL}/orders`, auth.isUserAuthenticated, orderRoute);
app.use(errorMiddleware);

export default app;
