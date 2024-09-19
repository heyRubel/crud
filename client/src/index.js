import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
);
