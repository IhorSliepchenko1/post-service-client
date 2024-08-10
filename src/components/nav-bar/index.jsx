import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context";
import { logout } from "../../features/auth/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.currentSlice.userData);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
            <Link
              color="primary"
              className="cursor-pointer"
              onClick={() => navigate("/all-mails")}
            >
              All mails
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
              All users
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="theme-icon-nav" onClick={toggleTheme}>
            {theme === "light" ? <CiLight /> : <CiDark />}
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
