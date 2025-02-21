import "./index.scss";
import "./styles.scss";
import process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
const App = React.lazy(() => import("./src/App"));
import { register, unregister } from "./service-worker";

if (process.env.NODE_ENV === "production") {
  register()
    .then(() => {
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    })
    .catch(console.error);
} else {
  unregister()
    .then(() => {
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    })
    .catch(console.error);
}
