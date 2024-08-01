import { useDispatch, useSelector } from "react-redux";
import { useMethod } from "../../hooks/useMethod";
import { useEffect, useState } from "react";
import { currentUserData } from "../../features/current/currentSlice";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalEditProfile from "../modal-edit-profile";
import { MdOutlineEdit } from "react-icons/md";

const UserInfo = () => {
  const { getInformation } = useMethod();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { email, name, token } = state.currentSlice.currentData;
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const currentUser = async () => {
    setLoading(true);
    const response = await getInformation(`current`);
    dispatch(currentUserData(response.data));
    setLoading(false);
  };

  useEffect(() => {
    currentUser();
  }, [onClose]);

  return (
    <>
      <Card className="user-card flex justify-center">
        {loading ? (
          <Spinner label="Loading..." color="warning" />
        ) : (
          <CardBody>
            <h4 className="acc-info">Account info:</h4>
            <div className="flex justify-between gap-3">
              <p>Your email: </p>
              <span>{state.currentSlice.currentData.email}</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <p>Status:</p>

              <span
                style={{
                  color: state.currentSlice.currentData.admin ? `green` : `red`,
                }}
              >{`${
                state.currentSlice.currentData.admin ? `admin` : `user`
              }`}</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <p>Your name:</p>
              <span>{state.currentSlice.currentData.name || `-`}</span>
            </div>
            <Divider />
            {state.currentSlice.currentData.token && (
              <div className="flex justify-between">
                <p> Email token:</p>
                <span style={{ color: `green` }}>
                  {state.currentSlice.currentData?.token}
                </span>
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
              onPress={() => handleOpen(`blur`)}
              className="capitalize"
              endContent={<MdOutlineEdit />}
            >
              Edit profile
            </Button>
          </div>
          <ModalEditProfile
            isOpen={isOpen}
            onClose={onClose}
            backdrop={backdrop}
            email={email}
            name={name}
            token={token}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default UserInfo;
