import { useEffect } from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../features/deleteUser/deleteUserSlice";

const PopUpDeleteUser = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { message } = state.deleteUser;

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearState());
    }, 1500);
  }, [message]);

  return (
    <div className={style.container}>
      <h3 className={style.user}>{message}</h3>
    </div>
  );
};

export default PopUpDeleteUser;
