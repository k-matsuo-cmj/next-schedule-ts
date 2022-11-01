import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ReadScheduleType } from "../../../utils/types";
import useAuth from "../../../utils/useAuth";

const formatDate = (d: Date): string => {
  const str = new Date(d).toISOString().substring(0, 16);
  console.log(str);
  return str;
};
const UpdateSchedule: NextPage<ReadScheduleType> = ({ schedule }) => {
  const [title, setTitle] = useState(schedule.title);
  const [place, setPlace] = useState(schedule.place);
  const [startAt, setStartAt] = useState(formatDate(schedule.startAt));
  const [endAt, setEndAt] = useState(formatDate(schedule.endAt));
  const [description, setDescription] = useState(schedule.description);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/schedule/update/${schedule._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            place: place,
            startAt: startAt,
            endAt: endAt,
            description: description,
          }),
        }
      );
      const jsonData = await response.json();
      router.push(`/schedule/${schedule._id}`);
      alert(jsonData.message);
    } catch (err) {
      alert("更新失敗");
    }
  };
  const loginUser = useAuth();
  if (loginUser.userId === schedule.userId) {
    return (
      <Container maxWidth="sm" sx={{ height: "70vh", my: 4 }}>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4">スケジュール編集</Typography>
          <FormControl fullWidth>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              label="件名"
              required
            />
            <TextField
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              type="text"
              name="place"
              label="場所"
              required
            />
            <TextField
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              type="datetime-local"
              name="startAt"
              label="開始"
              required
            />
            <TextField
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              type="datetime-local"
              name="endAt"
              label="終了"
              required
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              multiline
              rows={8}
              label="説明"
              required
            />
            <Button type="submit" variant="contained" size="large">
              更新
            </Button>
          </FormControl>
        </Box>
      </Container>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};
export default UpdateSchedule;

export const getServerSideProps: GetServerSideProps<ReadScheduleType> = async (
  content
) => {
  const response = await fetch(
    `http://localhost:3000/api/schedule/${content.query.id}`
  );
  const schedule = await response.json();
  return { props: schedule };
};
