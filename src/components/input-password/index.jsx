import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useState } from "react";

const InputPassword = ({ control, errorMessage, isInvalid }) => {
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        minLength: {
          value: 6,
          message: "Минимальная длина пароля 6 символов!",
        },
      }}
      render={({ field }) => (
        <Input
          {...field}
          label="Пароль"
          name="password"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
          placeholder="Введите ваш пароль"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          }
          errorMessage={errorMessage}
          type={isVisible ? "text" : "password"}
          className="input-width"
        />
      )}
    />
  );
};

export default InputPassword;
