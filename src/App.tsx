import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/index';
import './global.css';
import 'animate.css';
import Header from './components/Header';
import Welcome from './pages/welcome';
import { AppProvider } from './components/Context';
import WelcomeClient from './pages/welcome/client';
import WelcomeAccount from './pages/welcome/account';
import WelcomeSuccess from './pages/welcome/success';
import AddClient from './pages/addClient';
import InstallMod from './pages/install';

ReactDOM.createRoot(
  document.getElementById('abstractive') as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add/client" element={<AddClient />} />
          <Route path="/install/mod" element={<InstallMod />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="welcome/client" element={<WelcomeClient />} />
          <Route path="welcome/account" element={<WelcomeAccount />} />
          <Route path="welcome/success" element={<WelcomeSuccess />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
