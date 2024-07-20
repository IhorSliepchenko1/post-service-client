import { useSelector } from "react-redux";
import { useMethod } from "../../hooks/useMethod";
import { useEffect, useState } from "react";
const Main = () => {
  const userInfo = useSelector((state) => state.auth);
  const { currentUser } = useMethod();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const current = async () => {
    const response = await currentUser(userInfo.jwt, userInfo.id);
    return response;
  };

  useEffect(() => {
    current().then((res) => {
      setData([res.data]);
    });
  }, []);

  console.log(data);

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
