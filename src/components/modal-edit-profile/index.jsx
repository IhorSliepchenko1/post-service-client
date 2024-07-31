import {
  Modal,
  ModalContent,
  Input,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@nextui-org/react";
import InputMail from "../input-email";
import InputPassword from "./../input-password/index";

const ModalEditProfile = ({
  isOpen,
  onClose,
  handleSubmit,
  changeHandler,
  email,
  name,
  token,
  backdrop,
}) => {
  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit profile</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputMail changeHandler={changeHandler} defaultValue={email} />
                <InputPassword
                  changeHandler={changeHandler}
                  passMessage={`Minimum length 6 characters`}
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
              <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEditProfile;
