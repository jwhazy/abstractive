import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import { AppContext } from '../components/Context';
import ModLarge from '../components/ModLarge';
import clsxm from '../utils/clsxm';
import ModMedium from '../components/Mod';

function Home() {
  const { clients, activeClient, mods, setActiveClient, account } =
    useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!clients) {
      navigate('/welcome');
    }
  }, [clients, navigate]);

  return (
    <div className="flex flex-row px-4 justify-between">
      <div className="flex flex-col animate__animated animate__fadeIn">
        {account?.username ? (
          <h1 className="font-black text-gray-100">
            WELCOME BACK,
            <a className="text-white"> {account?.username.toUpperCase()}</a>
          </h1>
        ) : (
          <h1 className="font-black text-gray-100">MARKETPLACE</h1>
        )}
        <div className="pt-4">
          <h3 className="font-black">MODS</h3>
          <p className="font-medium">
            You currently have{' '}
            {activeClient?.mods
              ? activeClient?.mods.length === 1
                ? '1 mod'
                : `${activeClient?.mods.length} mods`
              : `${0}mods`}{' '}
            installed into {activeClient?.name}.
          </p>
          <div className="flex flex-wrap">
            {activeClient?.mods
              ? activeClient?.mods.map((mod) => (
                  <ModLarge key={mod.id} mod={mod} />
                ))
              : 'No mods installed.'}
          </div>
        </div>
        <div className="my-4">
          <h3 className="font-black">ALL MODS</h3>
          <div className="flex flex-wrap">
            {mods?.map((mod) => {
              if (!activeClient?.mods.find((m) => m.id === mod.id)) {
                return <ModMedium key={mod.id} mod={mod} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
