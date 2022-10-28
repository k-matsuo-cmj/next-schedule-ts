import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { secretKey } from "../../../utils/secretKey";
import {
  ExtendedNextApiRequestUser,
  ResMessageType,
  SavedUserDataType,
} from "../../../utils/types";

const loginUser = async (
  req: ExtendedNextApiRequestUser,
  res: NextApiResponse<ResMessageType>
) => {
  try {
    await connectDB();
    const user: SavedUserDataType | null = await UserModel.findOne({
      email: req.body.email,
    });
    if (user?.password != req.body.password) {
      throw Error("invalid email/password");
    }

    // save token
    const payload = { email: req.body.email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "23h" });
    return res.status(200).json({ message: "loginUser Success!", token });
  } catch (err) {
    return res.status(400).json({ message: "loginUser Failure..." + err });
  }
};
export default loginUser;
