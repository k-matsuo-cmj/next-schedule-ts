import mongoose from "mongoose";
import { UserDataType } from "./types";

const UserSchema = new mongoose.Schema<UserDataType>({
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
});

export const UserModel =
  mongoose.models.User || mongoose.model<UserDataType>("User", UserSchema);
