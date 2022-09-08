import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import { AppContext } from '../components/Context';
import ModLarge from '../components/ModLarge';
import clsxm from '../utils/clsxm';

function Home() {
  const { clients, activeClient, mods, setActiveClient } =
    useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex flex-row p-6 justify-between pt-12">
      <div className="flex flex-col animate__animated animate__fadeIn">
        <div className="">
          <h3>Mods</h3>
          <p>
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
          <h3>All mods</h3>
          <div className="flex flex-wrap">
            {mods?.map((mod) => {
              if (!activeClient?.mods.find((m) => m.id === mod.id)) {
                return <ModLarge key={mod.id} mod={mod} />;
              }
            })}
          </div>
        </div>
      </div>
      <Menu
        as="div"
        className="relative inline-block text-left animate__animated animate__fadeIn"
      >
        <div>
          <Menu.Button className="flex rounded-xl border border-gray-700 px-4 py-2 items-center space-x-2 h-max cursor-pointer">
            {activeClient?.name}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700">
            {clients
              ? Object.values(clients).map((client) => (
                  <Menu.Item key={client.id}>
                    {({ active }) => (
                      <div className="py-1">
                        <a
                          href="#"
                          onClick={() => {
                            setActiveClient?.(client);
                            invoke('set_active', { id: client.id });
                          }}
                          className={clsxm(
                            active ? ' bg-black bg-opacity-20' : 'text-white',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          {client.name}
                        </a>
                      </div>
                    )}
                  </Menu.Item>
                ))
              : null}

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  key={0}
                  onClick={() => navigate('/add/client')}
                  className={clsxm(
                    active ? ' bg-black bg-opacity-20' : 'text-white',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Add client
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Home;
