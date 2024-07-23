import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import { colorTheme } from "../../features/theme/themeSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const admin = useSelector((state) => state.currentSlice.currentData.admin);
  const dispatch = useDispatch();

  const [select, setSelect] = useState(
    JSON.parse(localStorage.getItem(`themeStatus`))
  );

  const toggleTheme = () => {
    setSelect((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem(`themeStatus`, JSON.stringify(select));

    dispatch(colorTheme(select ? `light` : `dark`));
  }, [toggleTheme, select]);

  const navigate = useNavigate();

  return (
    <Navbar>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            My mails
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="cursor-pointer"
            onClick={() => navigate("/create-mails")}
          >
            Create mail
          </Link>
        </NavbarItem>
        <NavbarItem>
          {admin && (
            <Link color="primary" className="cursor-pointer">
              All mails
            </Link>
          )}
        </NavbarItem>
        <NavbarItem>
          {admin && (
            <Link color="primary" className="cursor-pointer">
              All users
            </Link>
          )}
        </NavbarItem>

        <NavbarItem>
          {admin && (
            <Link color="primary" className="cursor-pointer">
              Add user
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="theme-icon" onClick={toggleTheme}>
            {select ? <CiLight /> : <CiDark />}
          </div>
        </NavbarItem>
        <NavbarItem>
          <Button color="danger" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
