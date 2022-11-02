import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  isSameDay,
  eachDayOfInterval,
} from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ResSchedulesType, SavedScheduleDataType } from "../../utils/types";
import { NextPage } from "next";

type MonthProps = {
  current: Date;
  schedules: SavedScheduleDataType[];
};

const Month: NextPage<MonthProps> = ({ current, schedules }) => {
  const start = startOfMonth(current);
  const end = endOfMonth(current);
  const days = [];
  [...Array(Number(format(start, "i")))].map((_, i) =>
    days.push(<Box key={i} />)
  );
  for (let d of eachDayOfInterval({ start, end })) {
    const schedulesOfDay = schedules.filter((schedule) =>
      isSameDay(new Date(schedule.startAt), d)
    );
    days.push(
      <Box key={format(d, "yyyyMMdd")} sx={{ aspectRatio: "1 / 0.6" }}>
        <Day date={d} schedules={schedulesOfDay} />
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
type DayProps = {
  date: Date;
  schedules: SavedScheduleDataType[];
};
const Day: NextPage<DayProps> = ({ date, schedules }) => {
  const mySchedules = [];
  for (let i = 0; i < schedules.length; i++) {
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
  return (
    <Card sx={{ height: "100%" }}>
      <Typography component="div" variant="subtitle1">
        {format(date, "d")}
      </Typography>
      {mySchedules}
    </Card>
  );
};

const CalendarBoard = () => {
  const [current, setCurrent] = useState<Date>(new Date(Date.now()));
  const [schedules, setSchedules] = useState<SavedScheduleDataType[]>([]);
  useEffect(() => {
    const readAll = async () => {
      const response = await fetch(
        "http://localhost:3000/api/schedule/readAll"
      ); //TODO: month
      const { schedules }: ResSchedulesType = await response.json();
      if (schedules) {
        setSchedules([...schedules]);
      }
    };
    readAll();
  }, [current]);

  return (
    <>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            onClick={() => setCurrent(addMonths(current, -1))}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h6">{format(current, "yyyy年MM月")}</Typography>
          <IconButton
            size="small"
            onClick={() => setCurrent(addMonths(current, 1))}
          >
            <ArrowRightIcon />
          </IconButton>
        </Box>
        <Month current={current} schedules={schedules} />
      </Stack>
    </>
  );
};
export default CalendarBoard;
