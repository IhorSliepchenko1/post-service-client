import { useDispatch, useSelector } from "react-redux";
import { useMethod } from "../../hooks/useMethod";
import { useEffect, useState } from "react";
import { currentUserData } from "../../features/current/currentSlice";

const Main = () => {
  const userInfo = useSelector((state) => state.auth);
  const { currentUser } = useMethod();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const current = async () => {
    const response = await currentUser(userInfo.jwt, userInfo.id);
    dispatch(currentUserData(response.data));
    return response;
  };

  useEffect(() => {
    current().then((res) => {
      setData([res.data]);
    });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div>{item.email}</div>
          <div>{`${item.admin}`}</div>
          <div>{item.name}</div>
          <div>{item?.token}</div>
        </div>
      ))}
    </div>
  );
};

export default Main;
