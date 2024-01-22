import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    isAdmin: {
      type: String,
      default: false,
    },
    mobile: {
      type: String,
    },
    // cart: [
    //   {
    //     typeof:  mongoose.Schema.Types.ObjectId,
    //     ref: "cart",
    //   }
    // ],
    // address: [
    //   {
    //     typeof:  mongoose.Schema.Types.ObjectId,
    //     ref: "addresse",
    //   }
    // ],
    // paymentInformaton: [
    //   {
    //     typeof:  mongoose.Schema.Types.ObjectId,
    //     ref: "payment_Informaton",
    //   }
    // ],
    // ratings: [
    //   {
    //     typeof:  mongoose.Schema.Types.ObjectId,
    //     ref: "ratings",
    //   }
    // ],
    // reviews: [
    //   {
    //     typeof:  mongoose.Schema.Types.ObjectId,
    //     ref: "reviews",
    //   }
    // ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
