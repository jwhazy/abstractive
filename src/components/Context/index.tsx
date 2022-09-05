/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useMemo, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { useNavigate } from "react-router-dom";
import { Client } from "../../types/Client";
import { Config } from "../../types/Config";

interface DefaultContext {
  setup: boolean | undefined;
  setSetup: (setup: boolean) => void;
  clients: Client[];
  setClients: (clients: Client[]) => void;
  activeClient: Client | undefined;
  setActiveClient: (client: Client) => void;
}

const AppContext = createContext<Partial<DefaultContext>>({});

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [setup, setSetup] = useState<boolean>(false);
  const [activeClient, setActiveClient] = useState<Client>();

  const navigate = useNavigate();

  const start = async () => {
    const isSetup = await invoke("setup");
    if (!isSetup) navigate("/welcome");

    const config: Config = JSON.parse(await invoke("get_config"));
    if (!config) throw new Error("Config is undefined");

    const active: Client | undefined = config.clients.find(
      (active) => active.id === config.active
    );

    setClients(config.clients);
    setActiveClient(active);
  };

  const value = useMemo(
    () => ({
      clients,
      setClients,
      activeClient,
      setup,
      setSetup,
      setActiveClient,
    }),
    [clients, activeClient, setup]
  );

  useEffect(() => {
    start();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
