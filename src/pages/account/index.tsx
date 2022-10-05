import { open } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

function LoginAccount() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>();
  const [codeVisible, setCodeVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openBrowser = () => {
    open('null');
    setCodeVisible(true);
  };

  const login = () => {
    invoke('login', { token: code }).then((r) => {
      const res = r as { auth: boolean; error?: string };

      if (!res.auth) {
        setError(res.error || 'Something went wrong. Please try again.');
        return;
      }

      window.location.href = '/';
    });
  };

  const back = () => navigate('/');

  return (
    <div className="flex h-[90vh]">
      <div className="m-auto space-y-4 w-1/2 animate__animated animate__fadeInUp">
        <div>
          <h1>Abstractive Account</h1>
          <p>To upload and edit mods, you will need to log in.</p>
        </div>
        <p className="font-bold text-red-800">
          DO NOT SHARE THIS CODE WITH ANYONE.
        </p>
        <div>
          <p>We have to open your browser to authenticate you with Discord.</p>
        </div>

        <div className="flex flex-col space-y-2">
          {codeVisible && (
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Authorization code"
              value={code}
              onChange={(e) => {
                setCode((e.target as HTMLInputElement).value);
                setError('');
              }}
            />
          )}
          <div className="space-x-2">
            <Button className="ml-0" onClick={code ? login : openBrowser}>
              {code ? 'Log in' : 'Continue'}
            </Button>
            <Button onClick={back}>Go back</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAccount;
