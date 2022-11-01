import { Box, Card, Stack, Typography } from "@mui/material";
import { addDays, format, startOfMonth, endOfMonth } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ResSchedulesType, SavedScheduleDataType } from "../../utils/types";

const Month = ({ current, schedules }) => {
  const start = startOfMonth(current);
  const end = endOfMonth(current);
  const days = [];
  [...Array(Number(format(start, "i")))].map((_, i) =>
    days.push(<Box key={i} />)
  );
  for (let d = start; d <= end; d = addDays(d, 1)) {
    days.push(
      <Box key={format(d, "yyyyMMdd")} sx={{ aspectRatio: "1 / 0.6" }}>
        <Day date={d} schedules={schedules} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "repeat(7, 1fr)",
      }}
    >
      <Box sx={{ textAlign: "center", color: "#f00" }}>日</Box>
      <Box sx={{ textAlign: "center" }}>月</Box>
      <Box sx={{ textAlign: "center" }}>火</Box>
      <Box sx={{ textAlign: "center" }}>水</Box>
      <Box sx={{ textAlign: "center" }}>木</Box>
      <Box sx={{ textAlign: "center" }}>金</Box>
      <Box sx={{ textAlign: "center", color: "#00f" }}>土</Box>
      {days}
    </Box>
  );
};
const Day = ({ date, schedules }) => {
  const mySchedules = [];
  console.log(date, schedules);
  for (let i = 0; i < schedules.length; i++) {
    if (
      format(new Date(schedules[i].startAt), "yyyyMMdd") ===
      format(date, "yyyyMMdd")
    ) {
      mySchedules.push(
        <Link href={`/schedule/${schedules[i]._id}`}>
          <Box
            sx={{
              height: "20px",
              background: "blue",
              color: "white",
              overflow: "hidden",
            }}
          >
            {schedules[i].title}
          </Box>
        </Link>
      );
    }
  }
  return (
    <Card sx={{ height: "100%" }}>
      <Typography component="div" variant="subtitle1">
        {format(date, "d")}
      </Typography>
      {mySchedules}
    </Card>
  );
};
//https://tech-it.r-net.info/program/react/334/
const CalendarBoard = () => {
  const [current, setCurrent] = useState<Date>(new Date(Date.now()));
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
  }, [current]);

  return (
    <>
      <p>{format(current, "yyyy年MM月")}</p>
      <Stack spacing={1}>
        <Month current={current} schedules={schedules} />
      </Stack>
    </>
  );
};
export default CalendarBoard;
