import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Login from "../../components/login";
import Registration from "../../components/register";
import { useState } from "react";
import { useTheme } from "../../context";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

const Auth = () => {
  const [selected, setSelected] = useState(`login`);

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="theme-icon" onClick={toggleTheme}>
        {theme === `light` ? <CiLight /> : <CiDark />}
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col">
          <Card className="max-w-full w-[340px] h-[450px]">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key)}
              >
                <Tab key="login" title="Вход">
                  <Login setSelected={setSelected} />
                </Tab>
                <Tab key="register" title="Регистрация">
                  <Registration setSelected={setSelected} />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
