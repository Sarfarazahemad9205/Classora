import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["notes", "pdf", "video"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
    },

    fileUrl: {
      type: String,
    },

    videoUrl: {
      type: String,
    },

    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Material = mongoose.model("Material", materialSchema);