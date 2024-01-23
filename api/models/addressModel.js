import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mobile: {
      type: String,
      required: true,
    },
    landmarks: {
      type: String,
    },
  },

  { timestamps: true }
);

const Addresse = mongoose.model("Address", addressSchema);

export default Addresse;
