import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mod, Mod as ModType } from '../types/Mod';
import { AppContext } from './Context';

type Props = {
  mod: ModType | string;
};

function ModRow(props: Props) {
  const { mods } = useContext(AppContext);

  const [modData, setModData] = useState<Mod>();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof props.mod === 'string') {
      setModData(mods?.find((m) => m.id === props.mod));
      return;
    }

    setModData(props.mod);
  }, [mods, props.mod]);

  return (
    <div
      onClick={() => navigate(`/install/mod?id=${modData?.id}`)}
      className="w-full cursor-pointer bg-opacity-0 transition-all hover:bg-opacity-100 bg-zinc-600 text-white shadow-sm flex items-center rounded-lg border border-zinc-600"
    >
      <img
        src={modData?.content?.icon}
        className="rounded-lg w-8 h-8 border-r border-zinc-600"
      />
      <div className="flex w-max items-center">
        <h4 className="ml-4 w-max font-black">
          {modData?.name?.toUpperCase()}
        </h4>
        <p className="ml-4 text-gray-200 font-medium tracking-widest w-max">
          {modData?.author?.toUpperCase()}
        </p>
        <p className="ml-4 text-gray-200 tracking-widest w-max">
          {modData?.version}
        </p>
      </div>
    </div>
  );
}

export default ModRow;
