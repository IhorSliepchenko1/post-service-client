import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { router } from "./router";

const App = () => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  );
};

export default App;
