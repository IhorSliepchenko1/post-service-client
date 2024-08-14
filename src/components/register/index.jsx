import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Button, Link } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../error-message";
import { fetchAuth } from "../../features/auth/authSlice";
import InputBasic from "../input";
import InputPassword from "../input-password";
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
      name: "",
      adminToken: "",
      token: "",
    },
  });
  const { language } = useTheme();
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

        <Input
          control={control}
          type="text"
          variant="bordered"
          label={
            list[language].name_upper[0] +
            list[language].name_upper.slice(1).toLowerCase()
          }
          placeholder={list[language].enter_name}
          name="name"
          className="input-width"
        />
        <Input
          control={control}
          type="text"
          variant="bordered"
          label={list[language].admin_key}
          placeholder={list[language].enter_admin_key}
          name="adminToken"
          className="input-width"
        />
        <Input
          control={control}
          type="text"
          variant="bordered"
          label={list[language].email_token}
          placeholder={list[language].enter_token}
          name="token"
          className="input-width"
        />

        <ErrorMessage error={error} />

        <p className="text-center text-small flex justify-center gap-2">
          {list[language].already_registered}
          <Link
            size="sm"
            className="cursor-pointer"
            onPress={() => setSelected("login")}
          >
            {list[language].login}
          </Link>
        </p>

        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            {list[language].register}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Registration;
