import { useDispatch, useSelector } from "react-redux";
import { useMethod } from "../../hooks/useMethod";
import { useEffect, useState } from "react";
import { currentUserData } from "../../features/current/currentSlice";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  Input,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import InputMail from "../input-mail";
import { emailStatus } from "../../features/validation/validationSlice";

const UserInfo = () => {
  const { universalGet, updateUser, changeHandler } = useMethod();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { email, name, token } = state.currentSlice.currentData;

  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  const currentUser = async () => {
    setLoading(true);
    const response = await universalGet(`current`);
    dispatch(currentUserData(response.data));
    setLoading(false);
  };

  useEffect(() => {
    currentUser();
  }, []);

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateUserApi = await updateUser();

      return updateUserApi;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="user-card flex justify-center">
        {loading ? (
          <Spinner label="Loading..." color="warning" />
        ) : (
          <CardBody>
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
                <p> Email token:</p>{" "}
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
            >
              Edit profile
            </Button>
          </div>
          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Edit profile</ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <InputMail
                        changeHandler={changeHandler}
                        defaultValue={email}
                      />

                      <Input
                        type="text"
                        variant="bordered"
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        onChange={changeHandler}
                        className="input-width"
                        defaultValue={name}
                      />
                      <Input
                        type="text"
                        variant="bordered"
                        label="Email token"
                        placeholder="Enter email token"
                        name="token"
                        onChange={changeHandler}
                        className="input-width"
                        defaultValue={token}
                      />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={onClose}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserInfo;
