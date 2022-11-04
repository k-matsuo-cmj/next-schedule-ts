import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import QueueIcon from "@mui/icons-material/Queue";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import jwt from "jsonwebtoken";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { secretKey } from "../utils/secretKey";
import { DecodedType } from "../utils/types";
import { useLoginContext } from "./loginContext";

const Header: NextPage = () => {
  const { loginUser, setLoginUser } = useLoginContext();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey) as DecodedType;
        setLoginUser({ ...decoded });
      } catch (err) {}
    }
  }, [setLoginUser]);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginUser({});
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" component="nav">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6">Next Schedule App</Typography>
          </Link>
          <Box sx={{ mr: "auto" }} />
          {!loginUser.userId && (
            <Link href="/user/login">
              <IconButton color="inherit" size="small" sx={{ mx: 4 }}>
                <LoginIcon /> Login
              </IconButton>
            </Link>
          )}
          {loginUser.userId && (
            <div>
              <Typography component="span" sx={{ mx: 4 }}>
                Hello {loginUser.userName} さん
              </Typography>

              <Link href="/schedule/create">
                <IconButton color="inherit" size="small" sx={{ mx: 2 }}>
                  <QueueIcon /> New
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                size="small"
                sx={{ mx: 2 }}
                onClick={logout}
              >
                <LogoutIcon /> Logout
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
