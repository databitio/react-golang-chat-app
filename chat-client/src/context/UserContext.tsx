import { createContext, useState } from "react";

export const colorArray = [
  "red",
  "green",
  "blue",
  "magenta",
  "cyan",
  "grey",
  "orange",
  "yellow",
  "purple",
  "indigo",
];

export interface User {
  username: string;
  setUsername: (username: string) => void;
  color: number;
  setColor: (color: number) => void;
  //Any other user info that needs to be kept track of
}

const UserContext = createContext<User>({} as User);

export const UserProvider = (props: any) => {
  const { children } = props;
  const [username, setUsername] = useState<string>("Anonymous");
  const [color, setColor] = useState<number>(
    Math.floor(Math.random() * colorArray?.length)
  );

  return (
    <UserContext.Provider value={{ username, setUsername, color, setColor }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
