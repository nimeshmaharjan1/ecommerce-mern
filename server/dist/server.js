"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: "server/config/config.env" });
mongoose_1.default
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => {
    console.log(`MongoDB connected with server: ${res.connection.host}`);
    app_js_1.default.listen(process.env.PORT, () => console.log(`Server is running @ : http://localhost:${process.env.PORT}`));
});
mongoose_1.default.connection.on("connected", () => console.log("MONGO CONNECTED"));
//Unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("Shutting down the server due to unhandled promise rejection.");
//   server.close(() => {
//     process.exit(1);
//   });
// });
