//react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
//redux
import { store } from "./redux/store.ts";
//router
import {router} from "./routes/routes.tsx";
//env
import { env } from "./config/env.ts";
console.log(env);
//components
//css
import "./index.css";
import { RouterProvider } from "react-router-dom";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
