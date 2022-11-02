import { Stack, Box, IconButton, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { addMonths, format } from "date-fns";
import { useState, useEffect } from "react";
import { SavedScheduleDataType, ResSchedulesType } from "../../utils/types";
import Month from "./MonthlyComponent";

const MonthlyBoard = () => {
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
export default MonthlyBoard;
