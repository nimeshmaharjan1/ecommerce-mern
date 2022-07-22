import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import mongoose from "mongoose";
dotenv.config({ path: "server/config/config.env" });
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(process.env.MONGO);
    app.listen(process.env.PORT, () =>
      console.log(`Server is running @ : http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.error(error));
mongoose.connection.on("connected", () => console.log("MONGO CONNECTED"));
