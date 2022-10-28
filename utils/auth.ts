import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  DecodedType,
  ExtendedNextApiRequestAuth,
  ResMessageType,
} from "./types";
import { secretKey } from "./secretKey";

const auth = (handler: Function) => {
  return async (
    req: ExtendedNextApiRequestAuth,
    res: NextApiResponse<ResMessageType>
  ) => {
    if (req.method === "GET") return handler(req, res);

    const token = await req.headers.authorization?.split(" ")[1];
    if (!token) res.status(401).json({ message: "token not found" });
    try {
      const decoded = jwt.verify(token!, secretKey) as DecodedType;
      req.body.userId = decoded.userId;
      req.body.userName = decoded.userName;
      return handler(req, res);
    } catch (err) {
      res.status(401).json({ message: "invalid token" });
    }
  };
};
export default auth;
