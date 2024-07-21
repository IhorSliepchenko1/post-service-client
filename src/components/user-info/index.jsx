import { useDispatch, useSelector } from "react-redux";
import { useMethod } from "../../hooks/useMethod";
import { useEffect, useState } from "react";
import { currentUserData } from "../../features/current/currentSlice";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.auth);
  const { universalGet } = useMethod();
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const current = async () => {
    const response = await universalGet(userInfo.jwt, userInfo.id, `current`);
    dispatch(currentUserData(response.data));
    return response;
  };

  useEffect(() => {
    current().then((res) => {
      setData([res.data]);
    });
  }, []);

  return (
    <div className="flex user-card">
      {data.map((item) => (
        <div className="min-w-full p-1" key={item.id}>
          <div className="flex justify-between gap-3">
            <p>Your email: </p>
            <span>{item.email}</span>
          </div>
          <div className="flex justify-between">
            <p>Status:</p>

            <span style={{ color: item.admin ? `green` : `red` }}>{`${
              item.admin ? `admin` : `user`
            }`}</span>
          </div>
          <div className="flex justify-between">
            <p>Your name:</p>
            <span>{item.name || `-`}</span>
          </div>
          {item.token && (
            <div className="flex justify-between">
              <p> Email token:</p>{" "}
              <span style={{ color: `green` }}>{item?.token}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
