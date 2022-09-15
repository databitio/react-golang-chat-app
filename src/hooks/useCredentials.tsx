import { useContext } from "react";
import UserContext from "../context/UserContext";

const useCredentials = () => {
  return useContext(UserContext);
};

export default useCredentials;
