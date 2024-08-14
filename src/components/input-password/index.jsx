import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import InputBasic from "../input";
import { list } from "../../languages";
import { useTheme } from "../../context";

const InputPassword = ({ control, placeholder }) => {
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useTheme();

  return (
    <InputBasic
      className="input-width"
      control={control}
      placeholder={placeholder}
      label={list[language].password}
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
