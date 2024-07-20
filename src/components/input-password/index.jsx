import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { passwordStatus } from "../../features/validation/validationSlice";

const InputPassword = ({ changeHandler, passMessage }) => {
  const dispatch = useDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(``);
  const validate = (value) => value.length >= 6;

  const isInvalid = useMemo(() => {
    if (value === "") return false;
    return validate(value) ? false : true;
  }, [value]);

  useEffect(() => {
    dispatch(passwordStatus(value.length >= 6 ? true : false));
  }, [isInvalid, value]);

  return (
    <Input
      label="Password"
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "success"}
      errorMessage={passMessage}
      onValueChange={setValue}
      placeholder="Enter your password"
      name="password"
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
      onChange={changeHandler}
      className="input-width"
    />
  );
};

export default InputPassword;

//    <Input
//      placeholder="Enter your email"
//      type="email"
//      label="Email"
//      variant="bordered"
//      isInvalid={isInvalid}
//      color={isInvalid ? "danger" : "success"}
//      errorMessage="Please enter a valid email"
//      onValueChange={setValue}
//      className="input-width"
//      name="email"
//      onChange={changeHandler}
//    />;
