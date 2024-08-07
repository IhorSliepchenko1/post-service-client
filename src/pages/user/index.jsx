import { useParams } from "react-router-dom";
import { useMethod } from "../../hooks/useMethod";
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
import { userData } from "../../features/user/userSlice";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { Spinner } from "@nextui-org/react";
import ModalDeleteProfile from "../../components/modal-delete";
import ModalEditProfile from "../../components/modal-edit-profile";
import { logout } from "../../features/auth/authSlice";

const User = () => {
  const { id } = useParams();
  const {
    getUserById,
    deleteAllMailsByUserId,
    deleteUserById,
    updateUserById,
  } = useMethod();
  const navigate = useNavigate();
  const { formatDate } = useConvertDate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { user } = state.user;
  const currentId = state.auth.id;
  const [loading, setLoading] = useState(true);
  const [userDelete, setUserDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState(0);

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

  const getUserInfo = async (id) => {
    setLoading(true);
    const response = await getUserById(id);

    const respData = {
      ...response.data,
      createdAt: formatDate(response.data.createdAt),
    };

    dispatch(userData(respData));

    setLoading(false);

    return respData;
  };

  const backAndClearState = () => {
    dispatch(userData({}));
    navigate(-1);
  };

  const deeteMailsAndUser = async () => {
    setUserDelete(null);
    try {
      await deleteAllMailsByUserId(id);
      const delUser = await deleteUserById(id);

      setUserDelete(delUser.data.message);

      setTimeout(() => {
        backAndClearState();
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateUserById(id, data);

      const respData = {
        ...updatedUser.data,
        createdAt: formatDate(updatedUser.data.createdAt),
      };

      dispatch(userData(respData));

      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo(id);
  }, []);

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
      {userDelete ? (
        <p className="text-center">{userDelete}</p>
      ) : (
        <Card className="card-user">
          {loading ? (
            <Spinner color="warning" />
          ) : (
            <>
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
                    <span>EMAIL TOKEN:</span>
                    <span className={!user.token ? "no-info" : ""}>
                      {user.token || `no information`}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex justify-between">
                  <span> MAILS SEND:</span>
                  <span className={user.count === 0 ? "no-info" : ""}>
                    {user.count}
                  </span>
                </div>
              </CardBody>
              <Divider />

              {user.admin ? (
                <div
                  className={`p-3 text-center ${
                    currentId === id ? `your` : `warning`
                  }`}
                >
                  {currentId === id ? (
                    <Button
                      color="danger"
                      onPress={() => {
                        handleOpenDel();
                        dispatch(logout());
                      }}
                    >
                      Delete My Account <MdDelete />
                    </Button>
                  ) : (
                    `This is a peer administrator account, you cannot
            change information about this admin-user!`
                  )}
                </div>
              ) : (
                <CardFooter className="flex justify-between">
                  <Button color="warning" onPress={() => handleOpenEdit()}>
                    Edit
                    <MdOutlineEdit />
                  </Button>
                  <Button color="danger" onPress={() => handleOpenDel()}>
                    Delete <MdDelete />
                  </Button>
                </CardFooter>
              )}
            </>
          )}
        </Card>
      )}

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
