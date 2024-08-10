import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useTheme } from "./context";

const App = () => {
  const { theme } = useTheme();

  return (
    <main className={`${theme} text-foreground bg-background`}>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
