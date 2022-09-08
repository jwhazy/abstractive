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
      className="ml-2 flex-col m-3 w-max cursor-pointer border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 flex items-center rounded-3xl"
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
