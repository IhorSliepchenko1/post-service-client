import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Button, Link } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../error-message";
import { fetchAuth, logout } from "../../features/auth/authSlice";
import InputBasic from "../input";
import InputPassword from "../input-password";
import { useEffect } from "react";

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

  const { error, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      dispatch(fetchAuth({ data, api: `register` }));
      setSelected("login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputBasic
          control={control}
          placeholder="Введите email"
          label="Email"
          name="email"
          type="email"
          className="input-width"
        />
        <InputPassword placeholder={`Введите пароль`} control={control} />

        <Input
          control={control}
          type="text"
          variant="bordered"
          label="Имя"
          placeholder="Введите ваше имя"
          name="name"
          className="input-width"
        />
        <Input
          control={control}
          type="text"
          variant="bordered"
          label="Админ токен"
          placeholder="Введите ключ администратора"
          name="adminToken"
          className="input-width"
        />
        <Input
          control={control}
          type="text"
          variant="bordered"
          label="Email токен"
          placeholder="Введите токен от вашего email"
          name="token"
          className="input-width"
        />

        <ErrorMessage error={error} />

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
