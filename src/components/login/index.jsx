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
import { list } from "../../languages";
import { useTheme } from "../../context";

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

  const { language } = useTheme();

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
        placeholder={list[language].enter_email}
        label={
          list[language].mail_upper[0] +
          list[language].mail_upper.slice(1).toLowerCase()
        }
        name="email"
        type="email"
        className="input-width"
      />
      <InputPassword
        placeholder={list[language].enter_password}
        control={control}
      />

      <ErrorMessage error={error?.error} />

      <p className="text-center text-small flex justify-center gap-2">
        {list[language].no_account}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("register")}
        >
          {list[language].register}
        </Link>
      </p>

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          {list[language].login}
        </Button>
      </div>
    </form>
  );
};

export default Registration;
