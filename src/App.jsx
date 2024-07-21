import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useSelector } from "react-redux";

const App = () => {
  const theme = useSelector((state) => state.theme.color);

  return (
    <main className={`${theme} text-foreground bg-background`}>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
