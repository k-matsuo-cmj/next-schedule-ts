import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import React, { useState } from "react";

const UserRegistPage: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert("UserRegist Fail");
    }
  };
  return (
    <Container maxWidth="sm" sx={{ height: "70vh", my: 4 }}>
      <Typography variant="h4">ユーザ登録</Typography>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1 } }}
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            label="名前"
            required
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Eメール"
            required
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="パスワード"
            required
          />
          <Button type="submit" variant="contained" size="large">
            登録
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default UserRegistPage;
