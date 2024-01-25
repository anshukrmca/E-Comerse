import mongoose from "mongoose";

const Schema = mongoose.Schema;

const colorSchema = new Schema(
    {
        colorName: {
            type: String,
            required: true,
        },
        colorCode: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Color = mongoose.model("color", colorSchema);

export default Color;
