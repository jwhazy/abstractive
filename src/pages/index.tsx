import { useContext } from "react";
import { AppContext } from "../components/Context";

function Home() {
  const { clients, activeClient } = useContext(AppContext);
  return (
    <div className="flex h-[85vh] text-center">
      <div className="m-auto">
        <div>
          <h1>Abstractive</h1>
          <p>In-development Fortnite mod marketplace.</p>
        </div>
        <div>
          <h1>Clients added</h1>
          {clients?.map((client) => (
            <div
              key={client.id}
              className={activeClient?.id === client.id ? "bg-green-500" : ""}
            >
              <h1>{client.name}</h1>
              <p>{client.directory}</p>
              <p>{client.id}</p>
              <p>{client.version}</p>
              <p>Mods</p>
              <p>
                {client?.mods.map((mod) => (
                  <p>{mod.id}</p>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
