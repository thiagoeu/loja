import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
    },
    zip_code: {
      type: String,
    },

    status: {
      type: String,
      default: true,
    },

    user_id: {
      type: mongoose.Schema.ObjectId,
      default: "",
    },
  },
  { timestamps: true }
);
const AddressModel = mongoose.model("address", addressSchema);
export default UserModel;
