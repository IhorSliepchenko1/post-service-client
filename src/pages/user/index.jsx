import { useParams } from "react-router-dom";
import { useMethod } from "../../hooks/useMethod";
import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useConvertDate } from "./../../hooks/useConverDate";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/user/userSlice";
import { MdOutlineEdit, MdDelete } from "react-icons/md";

const User = () => {
  const { id } = useParams();
  const { getUserById } = useMethod();
  const navigate = useNavigate();
  const { formatDate } = useConvertDate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { user } = state.user;

  const getMails = async (id) => {
    const response = await getUserById(id);

    const respData = {
      ...response.data,
      createdAt: formatDate(response.data.createdAt),
    };

    dispatch(userData(respData));
    return respData;
  };

  useEffect(() => {
    console.log(getMails(id));
  }, []);

  const backAndClearState = () => {
    dispatch(userData({}));
    navigate(-1);
  };

  return (
    <div className="user-container">
      <Button
        color="default"
        variant="ghost"
        startContent={<IoArrowBack />}
        onClick={() => backAndClearState()}
      >
        go back
      </Button>
      <Card className="card-user">
        <CardBody className="p-3 flex flex-col gap-4">
          <div className="flex justify-between">
            <span>CREATED ACCOUNT:</span>
            <span>{user.createdAt}</span>
          </div>
          <div className="flex justify-between">
            <span> USER NAME:</span>
            <span className={!user.name ? "no-info" : ""}>
              {user.name || `no information`}
            </span>
          </div>
          <div className="flex justify-between">
            <span> MAIL:</span>
            <span>{user.email}</span>
          </div>

          {!user.admin ? (
            <div className="flex justify-between">
              <span> EMAIL TOKEN:</span>
              <span className={!user.token ? "no-info" : ""}>
                {user.token || `no information`}
              </span>
            </div>
          ) : (
            <></>
          )}
          {!user.admin ? (
            <div className="flex justify-between">
              <span> PASSWORD:</span>
              <span>******</span>
            </div>
          ) : (
            <></>
          )}
        </CardBody>
        <Divider />

        {user.admin ? (
          <h2 className="p-3 text-center warning">
            This is a peer administrator account, you cannot change information
            about this admin-user!
          </h2>
        ) : (
          <CardFooter className="flex justify-between">
            <Button color="warning">
              Edit
              <MdOutlineEdit />
            </Button>
            <Button color="danger">
              Delete <MdDelete />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default User;
