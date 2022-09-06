import { open } from "@tauri-apps/api/shell";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { AppContext } from "../components/Context";
import { Mod } from "../types/Mod";
import clsxm from "../utils/clsxm";

const InstallMod = () => {
  const { mods } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeMod, setActiveMod] = useState<Mod>();

  const navigate = useNavigate();

  const openRepo = () => open(activeMod?.repository || "");

  const id = searchParams.get("id");

  const findMod = () => {
    const mod = mods?.find((m) => m.id === searchParams.get("id"));
    if (!mod) navigate("/");
    setActiveMod(mod);
  };

  useEffect(() => {
    findMod();
  });
  return (
    <div className="space-y-8">
      <img
        src={activeMod?.content?.banner}
        className={"w-full h-[256px] object-cover object-center"}
      />
      <div className="flex justify-center space-x-8 w-2/3">
        <img src={activeMod?.content?.icon} className="rounded-xl w-32 h-32" />
        <div className="flex flex-col justify-around">
          <div>
            <h1>{activeMod?.name}</h1>
            <p className="text-gray-200 tracking-widest">
              {activeMod?.author} • {activeMod?.version}
            </p>
          </div>
          <div className="space-x-4">
            <Button className="m-0">Install</Button>
            {activeMod?.repository ? (
              <Button className="m-0" onClick={openRepo}>
                Source code
              </Button>
            ) : null}
            <Button className="m-0">Report</Button>
          </div>
        </div>
      </div>
      <div className="px-16 space-y-8">
        <div className="flex flex-row">
          {activeMod?.content?.media.map((media) => {
            return <img src={media} className={"w-[128px] p-2"} />;
          })}
        </div>
        <div className="flex">
          <p>{activeMod?.longDescription}</p>
        </div>
        <div className="space-y-4">
          <div>
            <h3>Extra information</h3>
            <p>Transparency information about {activeMod?.name}</p>
          </div>
          {activeMod?.releaseDate && (
            <div>
              <h4>Release date</h4>
              <p>{activeMod?.releaseDate}</p>
            </div>
          )}
          {activeMod?.lastUpdated && (
            <div>
              <h4>Last updated</h4>
              <p>{activeMod?.lastUpdated}</p>
            </div>
          )}
          {activeMod?.previousVersions && (
            <div>
              <h4>Previously available versions</h4>
              <p>{activeMod?.previousVersions}</p>
            </div>
          )}
          {activeMod?.files && (
            <div>
              <h4>Content downloaded</h4>
              {activeMod?.files?.map((file) => (
                <p>
                  {file.name} • {file.type}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    // <div className={clsxm(`flex flex-col space-y-8 p-10 bg-[black]`)}>
    //   <div className="flex flex-col-reverse">
    //     <h1>{activeMod?.name}</h1>
    //     <p className="text-gray-200 tracking-widest">{activeMod?.author}</p>
    //   </div>
    //   <div>
    //     <p>{activeMod?.longDescription}</p>
    //   </div>
    //   <div className="flex flex-wrap">
    //     {activeMod?.content?.media.map((media) => {
    //       return <img src={media} className={"w-[512px] p-2"} />;
    //     })}
    //   </div>
    // </div>
  );
};

export default InstallMod;
