import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { EMAIL_REGEXP } from "../../config";

const InputEmail = ({ control, errorMessage, isInvalid, defaultValue }) => {
  return (
    <Controller
      name="email"
      defaultValue={defaultValue}
      control={control}
      rules={{
        pattern: {
          value: EMAIL_REGEXP,
          message: "Некорректный формат!",
        },
      }}
      render={({ field }) => (
        <Input
          {...field}
          type="email"
          variant="bordered"
          isInvalid={isInvalid}
          placeholder="Введите ваш email"
          label="Email"
          color={isInvalid ? "danger" : "success"}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};

export default InputEmail;
