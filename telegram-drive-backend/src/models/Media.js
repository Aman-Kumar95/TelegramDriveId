import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Media", mediaSchema);
