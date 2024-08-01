import { useForm } from "react-hook-form";
import { login, idCurrent } from "../../features/auth/authSlice";
import { Button, Link } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "../error-message";
import InputPassword from "../input-password";
import { useMethod } from "../../hooks/useMethod";
import InputEmail from "../input-email";
import { useNavigate } from "react-router-dom";

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
    },
  });

  const { userAuth } = useMethod();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await userAuth("login", data);
      if (response.statusText === `OK`) {
        dispatch(login(response.data.token));
        dispatch(idCurrent(response.data.userId));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputEmail
        control={control}
        errorMessage={errors.email?.message}
        isInvalid={errors.email}
      />
      <InputPassword
        control={control}
        isInvalid={errors.password}
        errorMessage={errors.password?.message}
      />

      <ErrorMessage error={state.error.value} />

      <p className="text-center text-small">
        Нет аккаунта?
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("register")}
        >
          Зарегистрироваться
        </Link>
      </p>

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Войти
        </Button>
      </div>
    </form>
  );
};

export default Registration;
