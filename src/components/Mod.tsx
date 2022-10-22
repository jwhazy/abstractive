import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mod, Mod as ModType } from '../types/Mod';
import { AppContext } from './Context';

type Props = {
  mod: ModType;
};

function ModMedium(props: Props) {
  const { mods } = useContext(AppContext);

  const [modData, setModData] = useState<Mod>();
  const navigate = useNavigate();

  useEffect(() => {
    setModData(mods?.find((m) => m.id === props.mod?.id));
  }, [mods, props.mod.id]);

  return (
    <div
      onClick={() => navigate(`/install/mod?id=${modData?.id}`)}
      className=" ml-0 mt-0 m-4 w-max cursor-pointer bg-opacity-0 transition-all hover:bg-opacity-100 bg-zinc-600 text-white shadow-sm flex items-center rounded-2xl border border-zinc-600"
    >
      <img
        src={modData?.content?.icon}
        className="rounded-2xl w-28 h-28 border-r border-zinc-600"
      />
      <div className="w-max">
        <p className="ml-4 text-gray-200 tracking-widest w-max">
          {modData?.author?.toUpperCase()}
        </p>
        <h3 className="ml-4 w-max font-black">
          {modData?.name?.toUpperCase()}
        </h3>

        <p className="ml-4 w-3/4">{modData?.shortDescription}</p>
      </div>
    </div>
  );
}

export default ModMedium;
