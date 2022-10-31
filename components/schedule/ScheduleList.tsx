import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ResSchedulesType, SavedScheduleDataType } from "../../utils/types";

const ScheduleList: NextPage = () => {
  const [schedules, setSchedules] = useState<SavedScheduleDataType[]>([]);
  useEffect(() => {
    const readAll = async () => {
      const response = await fetch(
        "http://localhost:3000/api/schedule/readAll"
      );
      const { schedules }: ResSchedulesType = await response.json();
      if (schedules) {
        setSchedules([...schedules]);
      }
    };
    readAll();
  }, []);
  console.log(schedules);
  return (
    <>
      <ul>
        {schedules.map((schedule) => (
          <li key={String(schedule._id)}>
            <p>{schedule.title}</p>
            <p>
              {String(new Date(schedule.startAt))} -{" "}
              {String(new Date(schedule.endAt))}
            </p>
            <p>
              {schedule.place} - {schedule.userName}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ScheduleList;
