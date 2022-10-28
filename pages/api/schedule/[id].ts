import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ScheduleModel } from "../../../utils/schemaModels";
import { ResScheduleType, SavedScheduleDataType } from "../../../utils/types";

const getSingleSchedule = async (
  req: NextApiRequest,
  res: NextApiResponse<ResScheduleType>
) => {
  try {
    await connectDB();
    const schedule: SavedScheduleDataType | null = await ScheduleModel.findById(
      req.query.id
    );
    if (!schedule) throw Error();
    return res
      .status(200)
      .json({ message: "getSingleSchedule Success", schedule: schedule });
  } catch (err) {
    return res.status(400).json({ message: "getSingleSchedule Failure..." });
  }
};
export default getSingleSchedule;
