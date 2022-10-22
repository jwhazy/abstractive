import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { open } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';

function LoginAccount() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>();
  const [error, setError] = useState<string>();

  const openBrowser = () => {
    open('http://localhost:3001/api/accounts/auth/client');
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

  useEffect(() => {
    openBrowser();
  }, []);

  const back = () => navigate(-1);

  return (
    <div className="flex h-[75vh]">
      <div className="m-auto space-y-4 w-1/2 animate__animated animate__fadeInUp">
        <div>
          <h2 className="font-black">ABSTRACTIVE ACCOUNT</h2>
          <p>To upload and edit mods, you will need to log in.</p>
        </div>
        <p className="font-bold text-red-800">
          DO NOT SHARE THIS CODE WITH ANYONE.
        </p>
        <div>
          <p>
            We have opened your browser, paste the code in below to
            authenticate.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
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
          <div className="ml-0 pt-2 flex justify-between w-full space-x-2">
            <Link onClick={back}>
              <ChevronLeftIcon className="h-6 w-6" /> Go back
            </Link>

            <Link onClick={login}>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAccount;
