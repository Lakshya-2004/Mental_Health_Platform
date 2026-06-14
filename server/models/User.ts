// models/User.ts

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["student", "counsellor" ,"admin"],
    default: "student",
  },
});

export default mongoose.model("User", userSchema);