import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import InputBasic from "../input";
import InputPassword from "../input-password";

const ModalEditProfile = ({
  isOpen,
  onClose,
  email,
  name,
  token,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: `onChange`,
    reValidateMode: `onBlur`,
    defaultValues: {
      email: email,
      password: "",
      name: name,
      token: token,
    },
  });

  return (
    <Modal backdrop={`blur`} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <InputBasic
              control={control}
              placeholder="Введите новый email"
              label="Email"
              name="email"
              type="email"
              defaultValue={email}
            />
            <InputPassword
              placeholder={`Введите новый пароль`}
              control={control}
            />

            <InputBasic
              control={control}
              placeholder="Введите ваше имя"
              label="Имя"
              name="name"
              type="text"
              defaultValue={name}
            />
            <InputBasic
              control={control}
              placeholder="Введите токен от вашего email"
              label="Email токен"
              name="token"
              type="text"
              defaultValue={token}
            />

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditProfile;
