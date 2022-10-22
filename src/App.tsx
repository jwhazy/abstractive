import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages';
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
import LoginAccount from './pages/account/login';
import Account from './pages/account';
import Logout from './pages/account/logout';
import Wrapper from './components/Wrapper';
import AuthorPage from './pages/author';

ReactDOM.createRoot(
  document.getElementById('abstractive') as HTMLElement
).render(
  <BrowserRouter>
    <AppProvider>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/account" element={<AuthorPage />} />
          <Route path="/add/client" element={<AddClient />} />
          <Route path="/install/mod" element={<InstallMod />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="welcome/client" element={<WelcomeClient />} />
          <Route path="welcome/account" element={<WelcomeAccount />} />
          <Route path="welcome/success" element={<WelcomeSuccess />} />
        </Routes>
      </Wrapper>
    </AppProvider>
  </BrowserRouter>
);
