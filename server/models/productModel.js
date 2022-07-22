import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
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
export default mongoose.model("products", productSchema);
