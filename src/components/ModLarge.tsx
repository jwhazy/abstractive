import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mod, Mod as ModType } from '../types/Mod';
import { AppContext } from './Context';

type Props = {
  mod: ModType;
};
function ModLarge(props: Props) {
  const { mods } = useContext(AppContext);

  const [modData, setModData] = useState<Mod>();
  const navigate = useNavigate();

  useEffect(() => {
    setModData(mods?.find((m) => m.id === props.mod?.id));
  }, [mods, props.mod.id]);

  return (
    <div
      onClick={() => navigate(`/install/mod?id=${modData?.id}`)}
      className="ml-0 flex-col m-3 w-max cursor-pointer bg-opacity-0 transition-all hover:bg-opacity-100 bg-zinc-600 text-white transitionshadow-sm mt-1 flex items-center rounded-3xl border border-zinc-600"
    >
      <img
        src={modData?.content?.banner}
        className="rounded-t-3xl object-cover w-[400px] h-32"
        alt=""
      />
      <div className="drop-shadow-md md:p-6 md:py-3 flex text-center items-center space-x-4">
        <h3>{modData?.name}</h3>
        <p className="text-gray-200 tracking-widest">{modData?.author}</p>
      </div>
    </div>
  );
}

export default ModLarge;
