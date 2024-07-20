import { useState, useMemo, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { emailStatus } from "../../features/validation/validationSlice";
import { EMAIL_REGEXP } from "../../config";

const InputMail = ({ changeHandler }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(``);

  const validateEmail = (value) => value.match(EMAIL_REGEXP);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  useEffect(() => {
    dispatch(emailStatus(value.length === 0 ? false : !isInvalid));
  }, [isInvalid]);

  return (
    <Input
      placeholder="Enter your email"
      type="email"
      label="Email"
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "success"}
      errorMessage="Please enter a valid email"
      onValueChange={setValue}
      className="input-width"
      name="email"
      onChange={changeHandler}
    />
  );
};

export default InputMail;
