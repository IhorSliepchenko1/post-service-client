import {
  Modal,
  ModalContent,
  Input,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useMethod } from "../../hooks/useMethod";
import InputEmail from "../input-email";
import InputPassword from "../input-password";

const ModalEditProfile = ({
  isOpen,
  onClose,
  backdrop,
  email,
  name,
  token,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: `onChange`,
    // reValidateMode: `onBlur`,
    defaultValues: {
      email: email,
      password: "",
      name: name,
      token: token,
    },
  });

  const { updateUser } = useMethod();

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(data);

      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <InputEmail
              control={control}
              defaultValue={email}
              errorMessage={errors.email?.message}
              isInvalid={errors.email}
            />

            <InputPassword
              control={control}
              isInvalid={errors.password}
              errorMessage={errors.password?.message}
            />

            <Input
              control={control}
              name="name"
              type="text"
              variant="bordered"
              label="Имя"
              placeholder="Введите ваше имя"
              className="input-width"
              defaultValue={name}
            />

            <Input
              control={control}
              name="token"
              type="text"
              variant="bordered"
              label="Email токен"
              placeholder="Введите токен от вашего email"
              className="input-width"
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
