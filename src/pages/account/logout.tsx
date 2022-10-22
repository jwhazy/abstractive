import { invoke } from '@tauri-apps/api/tauri';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/Context';
import Spinner from '../../components/Spinner';

function Logout() {
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAccount?.(undefined);
    invoke('logout', {
      id: account?.id,
      accessToken: account?.accessToken,
      refreshToken: account?.refreshToken,
    });
    navigate('/');
  });
  return (
    <div className="flex h-screen text-center">
      <div className="animate__animated animate__fadeInUp m-auto p-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-left text-5xl font-black">LOGGING OUT...</h1>
          <Spinner className="m-0 h-12 w-12" />
        </div>
      </div>
    </div>
  );
}

export default Logout;
