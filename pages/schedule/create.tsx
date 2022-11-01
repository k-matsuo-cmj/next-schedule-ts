import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useAuth from "../../utils/useAuth";

const CreateSchedule: NextPage = () => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/schedule/create",
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
      router.push(`/schedule/${jsonData.schedule._id}`);
      alert(jsonData.message);
    } catch (err) {
      alert("作成失敗");
    }
  };

  const loginUser = useAuth();
  console.log(loginUser);
  if (loginUser) {
    return (
      <Container maxWidth="sm" sx={{ height: "70vh", my: 4 }}>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4">スケジュール作成</Typography>
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
              作成
            </Button>
          </FormControl>
        </Box>
      </Container>
    );
  } else {
    return <></>;
  }
};
export default CreateSchedule;
