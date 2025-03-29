import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      unique: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    product_details: {
      type: Object,
      image: Array,
    },
    paymentId: {
      type: String,
      default: "",
    },
    paymente_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    subTotalAmt: {
      type: Number,
      default: 0,
    },
    totalAmt: {
      type: Number,
      default: 0,
    },

    invoice_receipt: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
