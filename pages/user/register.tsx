import { NextPage } from "next";
import React, { useState } from "react";

const UserRegistPage:NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        })});
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch(err) {
      alert("UserRegist Fail");
    }
  };
  return (<>
  <h1>ユーザ登録</h1>
  <form onSubmit={handleSubmit}>
    <input value={name} onChange={(e)=>setName(e.target.value)} name="name" />
    <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" />
    <input value={password} onChange={(e)=>setPassword(e.target.value)} name="password" />
    <button type="submit">登録</button>
  </form>
  </>);
};
export default UserRegistPage;
