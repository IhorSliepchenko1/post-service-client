import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalEditProfile from "../modal-edit-profile";
import { MdOutlineEdit } from "react-icons/md";
import { fetchCurrent } from "../../features/current/currentSlice";
import { fetchUpdate } from "../../features/update-user/updateUserSlice";
import { useTheme } from "../../context";
import { list } from "../../languages";

const UserInfo = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userData, status } = state.currentSlice;
  const { token, userId } = state.auth.userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { language } = useTheme();

  const currentInfo = () => {
    dispatch(fetchCurrent({ jwt: token, id: userId }));
  };

  const onSubmit = async (data) => {
    try {
      dispatch(fetchUpdate({ data, jwt: token, id: userId }));

      setTimeout(() => {
        currentInfo();
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    currentInfo();
  }, []);

  return (
    <>
      <Card className="user-card flex justify-center">
        {status === `loading` ? (
          <Spinner label="Loading..." color="warning" />
        ) : (
          <CardBody>
            <h4 className="acc-info"> {list[language].acc_info}:</h4>
            <div className="flex justify-between gap-3">
              <p>{list[language].email}: </p>
              <span>{userData.email}</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <p>{list[language].status}:</p>

              <span
                style={{
                  color: userData.admin ? `green` : `red`,
                }}
              >{`${userData.admin ? `admin` : `user`}`}</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <p>{list[language].name}:</p>
              <span>{userData.name || `-`}</span>
            </div>
            <Divider />
            {userData.token && (
              <div className="flex justify-between">
                <p>{list[language].email_token}:</p>
                <span style={{ color: `green` }}>{userData?.token}</span>
              </div>
            )}
            <Divider />
          </CardBody>
        )}

        <CardFooter className="flex justify-end">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="flat"
              color="warning"
              onPress={() => onOpen()}
              className="capitalize"
              endContent={<MdOutlineEdit />}
            >
              {list[language].edit_profile}
            </Button>
          </div>
          <ModalEditProfile
            onSubmit={onSubmit}
            isOpen={isOpen}
            onClose={onClose}
            email={userData.email}
            name={userData.name}
            token={userData.token}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default UserInfo;
