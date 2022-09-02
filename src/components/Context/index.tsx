/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useMemo, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { UpdateManifest } from "@tauri-apps/api/updater";
import { useNavigate } from "react-router-dom";

interface DefaultContext {
  setup: boolean | undefined;
  setSetup: (setup: boolean) => void;
}

const AppContext = createContext<Partial<DefaultContext>>({
  setup: undefined,
});

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const [setup, setSetup] = useState(false);

  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      setup,
      setSetup,
    }),
    [setup]
  );

  useEffect(() => {
    invoke("setup").then((m) => {
      if (!m) navigate("/welcome");
    });
  }, [setSetup]);

  if (setup === undefined) return <h1>Loading</h1>;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
