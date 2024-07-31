import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import ValidationError from "../validation-error";
import { useState } from "react";

const InputPassword = ({ control, isInvalid, errorMessage }) => {
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
        <>
          <Input
            {...field}
            label="Пароль"
            name="password"
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "success"}
            placeholder="Придумайте пароль"
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
            type={isVisible ? "text" : "password"}
            className="input-width"
          />
          {isInvalid && <ValidationError text={errorMessage} />}
        </>
      )}
    />
  );
};

export default InputPassword;
