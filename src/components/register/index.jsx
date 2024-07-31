import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Button, Link } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../error-message";
import InputPassword from "../input-password";
import { useMethod } from "../../hooks/useMethod";
import InputEmail from "../input-email";

const Registration = ({ setSelected }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: `onChange`,
    reValidateMode: `onBlur`,
    defaultValues: {
      email: "",
      password: "",
      name: "",
      adminToken: "",
      token: "",
    },
  });

  const { userAuth } = useMethod();
  const state = useSelector((state) => state);

  const onSubmit = async (data) => {
    try {
      const response = await userAuth("register", data);

      if (response.statusText === `OK`) {
        setSelected("login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputEmail
          control={control}
          errorMessage={errors.email?.message ?? ""}
          isInvalid={errors.email ?? ""}
        />
        <InputPassword
          control={control}
          isInvalid={errors.password ?? ""}
          errorMessage={errors.password?.message ?? ""}
        />

        <Input
          control={control}
          type="text"
          variant="bordered"
          label="Name"
          placeholder="Enter your name"
          name="name"
          className="input-width"
        />
        <Input
          control={control}
          type="text"
          variant="bordered"
          label="Admin token"
          placeholder="Enter admin token"
          name="adminToken"
          className="input-width"
        />
        <Input
          control={control}
          type="text"
          variant="bordered"
          label="Email token"
          placeholder="Enter email token"
          name="token"
          className="input-width"
        />

        <ErrorMessage error={state.error.value} />

        <p className="text-center text-small">
          Уже зарегистрированы?
          <Link
            size="sm"
            className="cursor-pointer"
            onPress={() => setSelected("login")}
          >
            Войти
          </Link>
        </p>

        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </>
  );
};

export default Registration;
