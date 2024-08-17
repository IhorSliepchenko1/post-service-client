import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useConvertDate } from "./../../hooks/useConverDate";
import { useDispatch, useSelector } from "react-redux";
import { clearStateUser, fetchUser } from "../../features/user/userSlice";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { Spinner } from "@nextui-org/react";
import ModalDeleteProfile from "../../components/modal-delete";
import ModalEditProfile from "../../components/modal-edit-profile";
import { logout } from "../../features/auth/authSlice";
import { fetchUpdate } from "../../features/update-user/updateUserSlice";
import {
  clearState,
  fetchDelete,
} from "../../features/deleteUser/deleteUserSlice";
import { useTheme } from "../../context";
import { list } from "../../languages";
const { formatDate } = useConvertDate();

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { token } = state.auth.userData;
  const { user, status } = state.user;
  const { userId } = state.auth.userData;

  // const { message } = state.deleteUser;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(0);

  const { language } = useTheme();

  const handleOpenDel = () => {
    setModal(0);
    setModal(1);
    onOpen();
  };

  const handleOpenEdit = () => {
    setModal(0);
    setModal(2);
    onOpen();
  };

  const getUserInfo = (id) => {
    dispatch(fetchUser({ jwt: token, id }));
  };

  const backAndClearState = () => {
    navigate(-1);
    dispatch(clearStateUser());
  };

  const deeteMailsAndUser = async () => {
    dispatch(fetchDelete({ jwt: token, id }));

    backAndClearState();

    setTimeout(() => {
      dispatch(logout());
    }, 1200);
  };

  const onSubmit = async (data) => {
    try {
      dispatch(fetchUpdate({ data, jwt: token, id }));

      setTimeout(() => {
        getUserInfo(id);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo(id);
  }, [language]);

  return (
    <div className="user-container">
      <Button
        color="default"
        variant="ghost"
        startContent={<IoArrowBack />}
        onClick={() => backAndClearState()}
      >
        {list[language].go_back}
      </Button>

      <Card className="card-user">
        {status === `loading` ? (
          <Spinner color="warning" />
        ) : (
          <>
            <CardBody className="p-3 flex flex-col gap-4">
              <div className="flex justify-between">
                <span>{list[language].created_account}:</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span> {list[language].user_name}:</span>
                <span className={!user.name ? "no-info" : ""}>
                  {user.name || `no information`}
                </span>
              </div>
              <div className="flex justify-between">
                <span> {list[language].mail_upper}:</span>
                <span>{user.email}</span>
              </div>

              {!user.admin ? (
                <div className="flex justify-between">
                  <span> {list[language].email_token.toUpperCase()}:</span>
                  <span className={!user.token ? "no-info" : ""}>
                    {user.token || `no information`}
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div className="flex justify-between">
                <span> {list[language].mails_send.toUpperCase()}:</span>
                <span className={user.count === 0 ? "no-info" : ""}>
                  {user.count}
                </span>
              </div>
            </CardBody>
            <Divider />

            {user.admin ? (
              <div
                className={`p-3 text-center ${
                  userId === id ? `your` : `warning`
                }`}
              >
                {userId === id ? (
                  <Button
                    color="danger"
                    onPress={() => {
                      handleOpenDel();
                    }}
                  >
                    <MdDelete /> {list[language].delete_account}
                  </Button>
                ) : (
                  list[language].descriptions
                )}
              </div>
            ) : (
              <CardFooter className="flex justify-between">
                <Button color="warning" onPress={() => handleOpenEdit()}>
                  {list[language].edit}
                  <MdOutlineEdit />
                </Button>
                <Button color="danger" onPress={() => handleOpenDel()}>
                  {list[language].delete} <MdDelete />
                </Button>
              </CardFooter>
            )}
          </>
        )}
      </Card>

      {modal === 1 ? (
        <ModalDeleteProfile
          isOpen={isOpen}
          handleDelete={deeteMailsAndUser}
          onClose={onClose}
        />
      ) : (
        <ModalEditProfile
          onSubmit={onSubmit}
          isOpen={isOpen}
          onClose={onClose}
          email={user.email}
          name={user.name}
          token={user.token}
        />
      )}
    </div>
  );
};

export default User;
