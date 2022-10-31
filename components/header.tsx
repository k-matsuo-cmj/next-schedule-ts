import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { DecodedType } from "../utils/types";
import { secretKey } from "../utils/secretKey";

const Header: NextPage = () => {
  const [loginUser, setLoginUser] = useState<DecodedType | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey) as DecodedType;
        setLoginUser({ ...decoded });
      } catch (err) {}
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" component="nav">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6">Next Schedule App</Typography>
          </Link>
          <Box>
            <Link href="/schedule/create">
              <Button sx={{ color: "#fff", mx: 2 }}>TEST</Button>
            </Link>
          </Box>
          {!loginUser && (
            <Link href="/user/login">
              <Typography>LOGIN</Typography>
            </Link>
          )}
          {loginUser && <Typography>HELLO {loginUser.userName}</Typography>}
          {loginUser && (
            <Button sx={{ color: "#fff", mx: 2 }} onClick={logout}>
              LOGOUT
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
