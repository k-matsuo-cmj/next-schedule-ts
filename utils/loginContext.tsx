import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DecodedType } from "./types";

type loginContextType = {
  loginUser: DecodedType;
  setLoginUser: Dispatch<SetStateAction<DecodedType>>;
};
const LoginContext = createContext<loginContextType | undefined>(undefined);

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }: {children?: ReactNode}) => {
  const [loginUser, setLoginUser] = useState<DecodedType>({});
  const value = {
    loginUser,
    setLoginUser,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
