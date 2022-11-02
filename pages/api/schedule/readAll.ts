import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ScheduleModel } from "../../../utils/schemaModels";
import { ResSchedulesType } from "../../../utils/types";

const getSchedules = async (
  req: NextApiRequest,
  res: NextApiResponse<ResSchedulesType>
) => {
  try {
    await connectDB();
    const schedules = await ScheduleModel.find().sort({
      startAt: "asc",
      endAt: "asc",
    });
    return res
      .status(200)
      .json({ message: "getSchedules Success", schedules: schedules });
  } catch (err) {
    return res.status(400).json({ message: "getSchedules Failure..." });
  }
};
export default getSchedules;
