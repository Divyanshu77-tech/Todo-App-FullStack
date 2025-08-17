import mongoose, { Schema } from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: String,
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
