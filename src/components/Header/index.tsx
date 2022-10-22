import { appWindow } from '@tauri-apps/api/window';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { invoke } from '@tauri-apps/api';
import Button from './Button';
import { AppContext } from '../Context';
import clsxm from '../../utils/clsxm';

function Header() {
  const close = () => appWindow.close();

  const navigate = useNavigate();

  const minimize = () => appWindow.minimize();

  const home = () => navigate('/');

  const login = () => navigate('/login');

  const manage = () => navigate('/account');

  const { account, activeClient, clients, setActiveClient } =
    useContext(AppContext);

  const route = useLocation().pathname;

  if (route.includes('welcome') || route.includes('login'))
    return (
      <div
        className="flex justify-end pl-4 h-8 fixed z-50 border-neutral-700  rounded drop-shadow-lg w-full items-center animate__animated animate__fadeIn"
        data-tauri-drag-region
      >
        <Button onClick={close} className="h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
    );

  return (
    <div
      className="flex justify-between pl-4 h-12 fixed z-50 bg-zinc-900 bg-opacity-20 backdrop-blur-xl border-b border-neutral-700  rounded drop-shadow-lg w-full items-center animate__animated animate__fadeIn"
      data-tauri-drag-region
    >
      <div className="animate__animated animate__fadeInDown">
        <h3 className="font-black cursor-pointer" onClick={home}>
          ABSTRACTIVE
        </h3>
      </div>
      <div className="flex flex-row-reverse items-center text-center animate__animated animate__fadeInDown">
        <Button onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
        <Button onClick={minimize}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-white mt-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </Button>
        {!account ? (
          <Button onClick={login}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Button>
        ) : (
          <Button onClick={manage}>
            <img src={account.avatar} className="w-7 rounded-full h-7" />
          </Button>
        )}

        {activeClient || (clients ? Object.keys(clients).length : 0) < 1 ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Button>
                <Menu.Button className="inline-flex w-full justify-center items-center">
                  {activeClient?.name}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </Button>
            </div>

            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl shadow-lg ring-1 bg-zinc-800 ring-black ring-opacity-5 focus:outline-none border-zinc-600 border">
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
                      'px-4 py-2 text-sm block w-full text-left'
                    )}
                  >
                    Add client
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Button onClick={() => navigate('/add/client')}>
            Add client
            <PlusIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
