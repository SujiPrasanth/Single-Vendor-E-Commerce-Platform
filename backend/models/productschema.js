import mongoose from "mongoose";

const productschema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `PRD-${Date.now()}`
    },

    productName: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default:0
    },
    finalprice:{
      type: Number,
      required:true
    },
    stockItem: {
      type: Number,
      required: true
    },

    productAvailable: {
      type: Boolean,
      default: true
    },

    shortDescription: {
      type: String
    },

    description: {
      type: String
    },

    productimage: {
      type: String,
      required: true
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true
    }
  },
  { timestamps: true }
);

const Productdetails = mongoose.model("Product", productschema);
export default Productdetails;
