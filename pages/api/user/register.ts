import { NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import {
  ExtendedNextApiRequestUser,
  ResMessageType,
} from "../../../utils/types";

const registUser = async (
  req: ExtendedNextApiRequestUser,
  res: NextApiResponse<ResMessageType>
) => {
  try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({ message: "registUser Success!" });
  } catch (err) {
    return res.status(400).json({ message: "registUser Failure..." });
  }
};
export default registUser;
