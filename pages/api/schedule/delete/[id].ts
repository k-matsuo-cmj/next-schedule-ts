import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../utils/database";
import { ScheduleModel } from "../../../../utils/schemaModels";
import { ResMessageType, SavedScheduleDataType } from "../../../../utils/types";

const deleteSchedule = async (
  req: NextApiRequest,
  res: NextApiResponse<ResMessageType>
) => {
  try {
    await connectDB();
    const schedule: SavedScheduleDataType | null = await ScheduleModel.findById(
      req.query.id
    );
    if (schedule?.userId != req.body.userId) throw Error();
    await ScheduleModel.deleteOne({ _id: req.query.id });
    return res.status(200).json({ message: "deleteSchedule Success" });
  } catch (err) {
    return res.status(400).json({ message: "deleteSchedule Failure..." });
  }
};
export default deleteSchedule;
