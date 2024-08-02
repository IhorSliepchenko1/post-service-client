import { Input } from "@nextui-org/react";
import { EMAIL_REGEXP } from "../../config";
import { useController } from "react-hook-form";

const InputBasic = ({
  name,
  label,
  placeholder,
  type,
  control,
  endContent,
  defaultValue,
  className,
}) => {
  let rules;
  switch (type) {
    case "email":
      rules = {
        rules: {
          pattern: {
            value: EMAIL_REGEXP,
            message: "Некорректный формат!",
          },
        },
      };

      break;

    case "password":
      rules = {
        rules: {
          minLength: {
            value: 6,
            message: "Минимальная длина пароля 6 символов!",
          },
        },
      };

      break;

    default:
      rules = {};
  }

  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    ...rules,
  });
  console.log(field);

  return (
    <Input
      className={className}
      id={name}
      label={label}
      type={type}
      variant="bordered"
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      color={invalid ? "danger" : "success"}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ``}`}
      endContent={endContent}
    />
  );
};

export default InputBasic;
