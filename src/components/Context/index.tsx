/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';
import { useNavigate } from 'react-router-dom';
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
    console.log('starting');
    const isSetup = await invoke('setup');
    if (!isSetup) {
      console.log('no config nav...');

      navigate('/welcome');
      setLoading(false);
      return;
    }

    console.log('trying to find cinfig');

    const config: Config = JSON.parse(await invoke('get_config'));

    if (!config) throw new Error('Config is undefined');

    console.log('trying to find active clinet');
    const active: Client | undefined = Object.values(config.clients).find(
      (a) => a.id === config.active
    );

    console.log('getting mods from net');

    const workerMods: Mod[] = JSON.parse(await invoke('get_mods'));

    console.log('setting vars');

    setMods(workerMods);
    setClients(config.clients);
    setActiveClient(active);

    console.log('trying to find account');

    if (config.account?.accessToken || config.account?.refreshToken)
      setAccount(
        JSON.parse(
          await invoke('verify', {
            accessToken: config.account.accessToken,
            refreshToken: config.account.refreshToken,
            id: config.account.id,
          })
        )
      );

    console.log(account);

    console.log('closing loading');

    setLoading(false);
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
        <div className="m-auto">
          <Spinner />
        </div>
      </div>
    );
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
