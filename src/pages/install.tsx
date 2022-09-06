import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../components/Context";
import { Mod } from "../types/Mod";
import clsxm from "../utils/clsxm";

const InstallMod = () => {
  const { mods } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeMod, setActiveMod] = useState<Mod>();

  const id = searchParams.get("id");

  const findMod = () => {
    const mod = mods?.find((m) => m.id === searchParams.get("id"));
    if (mod) setActiveMod(mod);
  };

  useEffect(() => {
    console.log(id);
    findMod();
  });
  return (
    <div className={clsxm(`flex flex-col space-y-8 p-10 bg-[black]`)}>
      <div className="flex flex-col-reverse">
        <h1>{activeMod?.name}</h1>
        <p className="text-gray-200 tracking-widest">{activeMod?.author}</p>
      </div>
      <div>
        <p>{activeMod?.longDescription}</p>
      </div>
      <div className="flex flex-wrap">
        {activeMod?.content?.media.map((media) => {
          return <img src={media} className={"w-[512px] p-2"} />;
        })}
      </div>
    </div>
  );
};

export default InstallMod;
