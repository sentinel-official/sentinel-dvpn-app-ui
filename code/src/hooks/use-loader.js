import {
  CHANGE_MESSAGE,
  START_LOADER,
  STOP_LOADER,
} from "@reducers/loader.reducer";
import { useDispatch } from "react-redux";

const useLoader = () => {
  const dispatch = useDispatch();
  const startLoader = ({ message = "", description = "" }) => {
    dispatch(START_LOADER({ message, description }));
  };
  const changeMessage = ({ message = "", description = "" }) => {
    dispatch(CHANGE_MESSAGE({ message, description }));
  };
  const stopLoader = () => {
    dispatch(STOP_LOADER());
  };
  return { startLoader, stopLoader, changeMessage };
};

export default useLoader;
