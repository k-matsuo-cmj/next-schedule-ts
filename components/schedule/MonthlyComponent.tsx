import {
  Box,
  Typography,
  Card,
  Tooltip,
  styled,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import {
  startOfMonth,
  endOfMonth,
  format,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { SavedScheduleDataType } from "../../utils/types";

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
export default Month;

type DayProps = {
  date: Date;
  schedules: SavedScheduleDataType[];
};
const Day: NextPage<DayProps> = ({ date, schedules }) => {
  const mySchedules = [];
  for (const s of schedules) {
    mySchedules.push(
      <Link href={`/schedule/${s._id}`}>
        <ScheduleTooltip title={scheduleTooltipContext(s)}>
          <Box
            sx={{
              height: "20px",
              background: "#06f",
              color: "white",
              overflow: "hidden",
            }}
          >
            <Typography variant="caption">
              {format(new Date(s.startAt), "HH:mm ")}
            </Typography>
            <Typography variant="caption">{s.title}</Typography>
          </Box>
        </ScheduleTooltip>
      </Link>
    );
  }
  return (
    <Card sx={{ height: "100%" }} variant="outlined">
      <Typography component="div" variant="subtitle1">
        {format(date, "d")}
      </Typography>
      {mySchedules}
    </Card>
  );
};

const ScheduleTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
const scheduleTooltipContext = (schedule: SavedScheduleDataType) => (
  <React.Fragment>
    <Box>
      <div>
        <Typography color="inherit" variant="subtitle2">
          {schedule.title} {"("} {schedule.userName} {")"}
        </Typography>
      </div>
      <div>
        <Typography color="inherit" variant="caption">
          {format(new Date(schedule.startAt), "MM/dd HH:mm")} {" - "}
          {format(new Date(schedule.endAt), "HH:mm")}
        </Typography>
      </div>
      <div>
        <Typography color="inherit" variant="caption">
          {schedule.place}
        </Typography>
      </div>
    </Box>
  </React.Fragment>
);
