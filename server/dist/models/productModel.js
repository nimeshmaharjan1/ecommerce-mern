"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product's name."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter the product's description."],
    },
    price: {
        type: Number,
        required: [true, "Please enter the product's number."],
        maxLength: [8, "Price cannot exceed eight characters."],
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter the product's category."],
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product's stock"],
        maxLength: [4, "Stock cannot exceed more than 4 characters!"],
        default: 1,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("products", productSchema);
