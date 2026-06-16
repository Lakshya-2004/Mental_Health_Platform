import mongoose from "mongoose";

const meetingRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

  
    userName: { type: String, 
      required: false, 
      default: "Anonymous" },

    userEmail: {
      type: String,
      required: true,
    },

    preferredDate: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

    meetLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MeetingRequest ||
  mongoose.model("MeetingRequest", meetingRequestSchema);