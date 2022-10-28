import { NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ScheduleModel } from "../../../utils/schemaModels";
import {
  ExtendedNextApiRequestSchedule,
  ResScheduleType,
  SavedScheduleDataType,
} from "../../../utils/types";

const createSchedule = async (
  req: ExtendedNextApiRequestSchedule,
  res: NextApiResponse<ResScheduleType>
) => {
  try {
    await connectDB();
    const schedule: SavedScheduleDataType = await ScheduleModel.create(
      req.body
    );
    return res
      .status(200)
      .json({ message: "createSchedule Success", schedule: schedule });
  } catch (err) {
    return res.status(400).json({ message: "createSchedule Failure..." });
  }
};
export default createSchedule;
