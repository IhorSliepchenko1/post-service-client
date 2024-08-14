import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Select,
  SelectItem,
  Avatar,
  Link,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context";
import { logout } from "../../features/auth/authSlice";
import { list } from "../../languages";
import SelectLanguage from "../select-language";

const NavBar = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.currentSlice.userData);
  const navigate = useNavigate();
  const { theme, toggleTheme, toggleLanguage, language } = useTheme();

  return (
    <Navbar>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            {list[language].my_mails}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer"
            onClick={() => navigate("/create-mails")}
          >
            {list[language].create_mails}
          </Link>
        </NavbarItem>
        <NavbarItem>
          {admin && (
            <Link
              color="primary"
              className="cursor-pointer"
              onClick={() => navigate("/all-mails")}
            >
              {list[language].all_mails}
            </Link>
          )}
        </NavbarItem>
        <NavbarItem>
          {admin && (
            <Link
              color="primary"
              className="cursor-pointer"
              onClick={() => navigate("/users")}
            >
              {list[language].all_users}
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <SelectLanguage toggleLanguage={toggleLanguage} language={language} />

        <NavbarItem>
          <div className="theme-icon-nav" onClick={toggleTheme}>
            {theme === "light" ? <CiLight /> : <CiDark />}
          </div>
        </NavbarItem>
        <NavbarItem>
          <Button color="danger" onClick={() => dispatch(logout())}>
            {list[language].logout}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
