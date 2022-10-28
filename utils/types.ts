import { Types } from "mongoose";
import { NextApiRequest } from "next";

export interface UserDataType {
  name: string;
  email: string;
  password: string;
}
export interface ScheduleDataType {
  title: string;
  startAt: Date;
  endAt: Date;
  place: string;
  description: string;
  userId: string;
  userName: string;
}

// backend
// (common)
export interface ResMessageType {
  message: string;
  token?: string;
}
// api/user
// register.ts
export interface ExtendedNextApiRequestUser extends NextApiRequest {
  body: UserDataType;
}
// login.ts
export interface SavedUserDataType extends UserDataType {
  _id: Types.ObjectId;
}
// api/schedule
// create.ts
export interface ExtendedNextApiRequestSchedule extends NextApiRequest {
  body: ScheduleDataType;
}
// readAll.ts
export interface SavedScheduleDataType extends ScheduleDataType {
  _id: Types.ObjectId;
}
export interface ResSchedulesType extends ResMessageType {
  schedules?: SavedScheduleDataType[];
}
// [id].ts
export interface ResScheduleType extends ResMessageType {
  schedule?: SavedScheduleDataType;
}
