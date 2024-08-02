import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import InputBasic from "../input";

const InputPassword = ({ control, placeholder }) => {
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputBasic
      className="input-width"
      control={control}
      placeholder={placeholder}
      label="Пароль"
      name="password"
      type={!isVisible ? "password" : "text"}
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
    />
  );
};

export default InputPassword;
