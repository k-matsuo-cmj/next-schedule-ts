import { NextApiResponse } from "next";
import connectDB from "../../../../utils/database";
import { ScheduleModel } from "../../../../utils/schemaModels";
import {
  ExtendedNextApiRequestSchedule,
  ResMessageType,
  SavedScheduleDataType,
} from "../../../../utils/types";

const updateSchedule = async (
  req: ExtendedNextApiRequestSchedule,
  res: NextApiResponse<ResMessageType>
) => {
  try {
    await connectDB();
    const schedule: SavedScheduleDataType | null = await ScheduleModel.findById(
      req.query.id
    );
    if (schedule?.userId != req.body.userId) throw Error();
    await ScheduleModel.updateOne({ _id: req.query.id }, req.body);
    return res.status(200).json({ message: "updateSchedule Success" });
  } catch (err) {
    return res.status(400).json({ message: "updateSchedule Failure" });
  }
};
export default updateSchedule;
