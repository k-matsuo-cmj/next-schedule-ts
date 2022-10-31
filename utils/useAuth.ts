import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { DecodedType } from "./types";
import { secretKey } from "./secretKey";

const useAuth = (): DecodedType => {
  const [loginUser, setLoginUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // ログインページへ遷移
      router.push("/user/login");
    }

    try {
      // ログインユーザを保存
      const decoded = jwt.verify(token!, secretKey) as DecodedType;
      const { userId, userName, email } = decoded;
      setLoginUser({ userId, userName, email });
    } catch (err) {
      router.push("/user/login");
    }
  }, [router]);

  return loginUser;
};
export default useAuth;
