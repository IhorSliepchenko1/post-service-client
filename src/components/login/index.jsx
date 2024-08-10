import { useForm } from "react-hook-form";
import { Button, Link } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "../error-message";
import { useNavigate } from "react-router-dom";
import InputBasic from "../input";
import InputPassword from "../input-password";
import { fetchAuth } from "../../features/auth/authSlice";
import { fetchCurrent } from "./../../features/current/currentSlice";
import { useEffect } from "react";
import { fetchMails } from "../../features/mails/mailsSlice";

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

  const state = useSelector((state) => state);
  const { userData, status, error } = state.auth;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      dispatch(fetchAuth({ data, api: `login` }));
    } catch {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === `succeeded`) {
      dispatch(fetchCurrent({ jwt: userData.token, id: userData.userId }));
      dispatch(
        fetchMails({
          jwt: userData.token,
          limit: 10,
          page: 1,
          id: userData.userId,
          api: `my-mails`,
        })
      );
      navigate("/");
    }
  }, [status]);

  return (
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

      <ErrorMessage error={error?.error} />

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
