import mongoose, { Types } from "mongoose";
import { ScheduleDataType, UserDataType } from "./types";

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
const ScheduleSchema = new mongoose.Schema<ScheduleDataType>({
  title: {
    type: String,
    required: true,
  },
  startAt: Date,
  endAt: Date,
  place: String,
  description: String,
  userId: String,
  userName: String,
});

export const UserModel =
  mongoose.models.User || mongoose.model<UserDataType>("User", UserSchema);
export const ScheduleModel =
  mongoose.models.Schedule ||
  mongoose.model<ScheduleDataType>("Schedule", ScheduleSchema);
