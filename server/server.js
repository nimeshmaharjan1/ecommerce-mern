import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "server/config/config.env" });
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
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
