import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useMethod } from "../../hooks/useMethod";

const NavBar = () => {
  const admin = useSelector((state) => state.currentSlice.currentData.admin);
  const token = useSelector((state) => state.auth.jwt);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const { getAllMails } = useMethod();

  return (
    <Navbar>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" className="cursor-pointer">
            My mails
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="cursor-pointer">
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
          <Button color="danger" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
