import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim:true,
        },

        description: {
            type: String,
            required:true,
            trim:true,
        },
    },
    {
        timestamps: true,
    }
);

export const Subject = mongoose.model("Subject", schema);