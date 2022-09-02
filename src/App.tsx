import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import "./global.css";
import "animate.css";
import Header from "./components/Header";
import Welcome from "./pages/welcome";
import { AppProvider } from "./components/Context";
import WelcomeClient from "./pages/welcome/client";
import WelcomeAccount from "./pages/welcome/account";

ReactDOM.createRoot(
  document.getElementById("abstractive") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="welcome/client" element={<WelcomeClient />} />
          <Route path="welcome/account" element={<WelcomeAccount />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
