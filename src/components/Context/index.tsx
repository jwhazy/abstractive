/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';
import { useNavigate } from 'react-router-dom';
import { info, warn } from 'tauri-plugin-log-api';
import { Client } from '../../types/Client';
import { Config } from '../../types/Config';
import { Mod } from '../../types/Mod';
import Spinner from '../Spinner';
import { Account } from '../../types/Account';

interface DefaultContext {
  setup: boolean | undefined;
  setSetup: (setup: boolean) => void;
  clients: Record<string, Client>;
  setClients: (clients: Record<string, Client>) => void;
  activeClient: Client | undefined;
  setActiveClient: (client: Client) => void;
  mods: Mod[];
  setMods: (mods: Mod[]) => void;
  account: Account | undefined;
  setAccount: (account: Account | undefined) => void;
}

const AppContext = createContext<Partial<DefaultContext>>({});

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const [clients, setClients] = useState<Record<string, Client>>();
  const [setup, setSetup] = useState<boolean>(false);
  const [mods, setMods] = useState<Mod[]>();
  const [activeClient, setActiveClient] = useState<Client>();
  const [account, setAccount] = useState<Account>();

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const start = async () => {
    info('Abstractive frontend starting...');
    const isSetup = await invoke('setup');
    if (!isSetup) {
      warn('No config found, redirecting to setup.');

      navigate('/welcome');
      setLoading(false);
      invoke('close_splashscreen');
      return;
    }

    info('Trying to find config');

    const config: Config = JSON.parse(await invoke('get_config'));

    if (!config) throw new Error('Config is undefined - redirecting to setup');

    info('Config found, setting up - trying to set client');
    const active: Client | undefined = Object.values(config.clients).find(
      (a) => a.id === config.active
    );

    info('Client found - getting mods from worker.');

    const workerMods: Mod[] = JSON.parse(await invoke('get_mods'));

    info('Mods fetched. Setting state.');

    setMods(workerMods);
    setClients(config.clients);
    setActiveClient(active);

    info('Trying to find account.');

    if (config.account?.accessToken || config.account?.refreshToken) {
      const req = JSON.parse(
        await invoke('verify', {
          accessToken: config.account.accessToken,
          refreshToken: config.account.refreshToken,
          id: config.account.id,
        })
      );

      if (req.accessToken && req.refreshToken && req.id) {
        setAccount(req);
      }
    }

    info('Closing loading.');

    setLoading(false);
    invoke('close_splashscreen');
  };

  const value = useMemo(
    () => ({
      clients,
      setClients,
      activeClient,
      setActiveClient,
      setup,
      setSetup,
      mods,
      setMods,
      account,
      setAccount,
    }),
    [clients, activeClient, setup, mods, account]
  );

  useEffect(() => {
    start();
    // Adding the start function just halts the app. Not sure why.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex h-[90vh] justify-center">
        <div className="m-auto flex space-x-8">
          <h1 className="font-black">LOADING...</h1>
          <Spinner className="m-0 bg-white w-10 h-10" />
        </div>
      </div>
    );
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
