import { Types } from "mongoose";
import { NextApiRequest } from "next";

export interface UserDataType {
  name: string;
  email: string;
  password: string;
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
