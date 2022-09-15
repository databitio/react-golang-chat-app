import { useContext } from "react";
import ServerContext from "../context/ServerContext";

const useCredentials = () => {
  return useContext(ServerContext);
};

export default useCredentials;
