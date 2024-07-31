import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import ValidationError from "../validation-error";
import { EMAIL_REGEXP } from "../../config";

const InputEmail = ({ control, errorMessage, isInvalid }) => {
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        pattern: {
          value: EMAIL_REGEXP,
          message: "Некорректный формат!",
        },
      }}
      render={({ field }) => (
        <>
          <Input
            {...field}
            type="email"
            variant="bordered"
            isInvalid={isInvalid}
            placeholder="Введите свой email"
            label="Email"
            color={isInvalid ? "danger" : "success"}
          />
          {isInvalid && <ValidationError text={errorMessage} />}
        </>
      )}
    />
  );
};
export default InputEmail;
