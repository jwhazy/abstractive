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
    const isSetup = await invoke('setup');
    if (!isSetup) {
      navigate('/welcome');
      return setLoading(false);
    }

    const config: Config = JSON.parse(await invoke('get_config'));
    if (!config) throw new Error('Config is undefined');

    const active: Client | undefined = Object.values(config.clients).find(
      (a) => a.id === config.active
    );

    const workerMods: Mod[] = JSON.parse(await invoke('get_mods'));

    setMods(workerMods);
    setClients(config.clients);
    setActiveClient(active);

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
    }),
    [clients, activeClient, setup, mods]
  );

  useEffect(() => {
    start();
  });

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
