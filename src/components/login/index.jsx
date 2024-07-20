import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { useLogin } from "../../hooks/useLogin";
import { Button, Link } from "@nextui-org/react";
import { ErrorMessage } from "../error-message";
import InputMail from "../input-mail";
import InputPassword from "../input-password";
import { useEffect, useState } from "react";
import {
  emailStatus,
  passwordStatus,
} from "../../features/validation/validationSlice";

const Login = ({ setSelected }) => {
  const { changeHandler, apiHandler } = useLogin();
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.error.value);

  const loginState = useSelector((state) => state.validation.email);
  const passwordState = useSelector((state) => state.validation.password);

  useEffect(() => {
    loginState && passwordState ? setDisabled(false) : setDisabled(true);
  }, [loginState, passwordState]);

  useSelector((state) => state.error.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginApi = await apiHandler();
      dispatch(login(loginApi.data.token));
      dispatch(emailStatus(false));
      dispatch(passwordStatus(false));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputMail changeHandler={changeHandler} />
        <InputPassword changeHandler={changeHandler} passMessage={``} />
        <ErrorMessage error={error} />
        <p className="text-center text-small">
          Нет аккаутна?
          <Link
            size="sm"
            className="cursor-pointer"
            onPress={() => setSelected("sign-up")}
          >
            Зарегистрироваться
          </Link>
        </p>

        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit" isDisabled={disabled}>
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
