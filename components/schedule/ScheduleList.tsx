import { Card, CardContent, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { NextPage } from "next";
import Link from "next/link";
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
  return (
    <Grid container rowSpacing={1}>
      {schedules.map((schedule) => (
        <Grid item xs={12} key={String(schedule._id)}>
          <Link href={`/schedule/${schedule._id}`}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {schedule.title}
                </Typography>
                <p>
                  {format(new Date(schedule.startAt), "yyyy/MM/dd HH:mm")}
                  {" - "}
                  {format(new Date(schedule.endAt), "HH:mm")}
                </p>
                <p>
                  {schedule.place} {schedule.userName}
                </p>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
export default ScheduleList;
