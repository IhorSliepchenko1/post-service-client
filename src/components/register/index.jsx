import { Input } from "@nextui-org/react";
import { useDebugValue, useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { useRegister } from "./../../hooks/useRegister";
import { ErrorMessage } from "../error-message";
import InputMail from "../input-mail";
import InputPassword from "../input-password";
import {
  emailStatus,
  passwordStatus,
} from "../../features/validation/validationSlice";
import { errorMessage } from "../../features/error/errorSlice";

const Registration = ({ setSelected }) => {
  const [disabled, setDisabled] = useState(true);

  const { changeHandler, apiHandler } = useRegister();
  const error = useSelector((state) => state.error.value);
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.validation.email);
  const passwordState = useSelector((state) => state.validation.password);
  useEffect(() => {
    loginState && passwordState ? setDisabled(false) : setDisabled(true);
  }, [loginState, passwordState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerApi = await apiHandler();

      if (registerApi.statusText === `OK`) {
        setSelected("login");
        dispatch(emailStatus(false));
        dispatch(passwordStatus(false));
        dispatch(errorMessage(``));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputMail changeHandler={changeHandler} />
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
        />
        <Input
          type="text"
          variant="bordered"
          label="Admin token"
          placeholder="Enter admin token"
          name="adminToken"
          onChange={changeHandler}
          className="input-width"
        />
        <Input
          type="text"
          variant="bordered"
          label="Email token"
          placeholder="Enter email token"
          name="token"
          onChange={changeHandler}
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
          <Button fullWidth color="primary" type="submit" isDisabled={disabled}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </>
  );
};

export default Registration;
