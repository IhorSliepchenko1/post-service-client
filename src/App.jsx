import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { errorMessage } from "./features/error/errorSlice";

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(errorMessage(""));
    }, 3000);
  }, [state]);

  return (
    <main className={`${state.theme.color} text-foreground bg-background`}>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
