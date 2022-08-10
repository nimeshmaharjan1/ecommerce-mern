import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
dotenv.config({ path: "server/config/config.env" });
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log(`MongoDB connected with server: ${res.connection.host}`);
    app.listen(process.env.PORT, () =>
      console.log(`Server is running @ : http://localhost:${process.env.PORT}`)
    );
  });
mongoose.connection.on("connected", () => console.log("MONGO CONNECTED"));

//Unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("Shutting down the server due to unhandled promise rejection.");
//   server.close(() => {
//     process.exit(1);
//   });
// });
