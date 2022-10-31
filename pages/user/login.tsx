import { Button, Container, FormControl, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      alert("Login Success");
      router.push("/");
    } catch (err) {
      alert("Login Fail");
    }
  };
  return (
    <Container maxWidth="sm" sx={{ height: "80vh" }}>
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Eメール"
            sx={{ mb: 2 }}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="パスワード"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" size="large">
            ログイン
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
export default LoginPage;
