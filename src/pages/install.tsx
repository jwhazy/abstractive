import {
  ArrowSmallLeftIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
  FlagIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { useContext, useEffect, useState } from 'react';
import {
  Link as DOMLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { AppContext } from '../components/Context';
import Link from '../components/Link';
import { Mod } from '../types/Mod';

function InstallMod() {
  const { mods, activeClient } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const [activeMod, setActiveMod] = useState<Mod>();

  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const openRepo = () => open(activeMod?.repository || '');

  const install = async () => {
    await invoke('install_mod', {
      modId: activeMod?.id,
      clientId: activeClient?.id,
    });
    window.location.href = '/';
  };

  const uninstall = async () => {
    await invoke('uninstall_mod', {
      modId: activeMod?.id,
      clientId: activeClient?.id,
    });
    window.location.href = '/';
  };

  const findMod = () => {
    const mod = mods?.find((m) => m.id === searchParams.get('id'));
    if (!mod) navigate('/');
    setActiveMod(mod);
  };

  useEffect(() => {
    findMod();
  });
  return (
    <div className="space-y-8 -mt-16">
      <img
        src={activeMod?.content?.banner}
        className="w-full h-[400px] object-cover object-center animate__animated animate__fadeInDown"
      />

      <div className="flex justify-center space-x-8 w-1/2 animate__animated animate__fadeInUp">
        <div onClick={goBack}>
          <ArrowSmallLeftIcon className="w-8 h-8 cursor-pointer" />
        </div>
        <img src={activeMod?.content?.icon} className="rounded-xl w-32 h-32" />
        <div className="flex flex-col justify-around ">
          <div>
            <h1 className="font-black">{activeMod?.name?.toUpperCase()}</h1>
            <p className="text-gray-200 tracking-widest">
              <DOMLink to={`/account?id=${activeMod?.authorId}`}>
                {activeMod?.author}
              </DOMLink>{' '}
              • {activeMod?.version}
            </p>
          </div>
          <div className="space-x-2 flex">
            {!activeClient?.mods?.find((m) => m.id === activeMod?.id) ? (
              <Link>
                <PlusCircleIcon
                  className="text-white h-9 w-9"
                  onClick={install}
                />
              </Link>
            ) : (
              <Link>
                <CheckCircleIcon
                  className="text-white h-9 w-9"
                  onClick={uninstall}
                />
              </Link>
            )}
            {!activeClient?.mods?.find((m) => m.id === activeMod?.id) ? (
              <Link>
                <FlagIcon className="text-white h-9 w-9" />
              </Link>
            ) : (
              <Link>
                <Cog8ToothIcon className="text-white h-9 w-9" />
              </Link>
            )}

            {activeMod?.repository ? (
              <Link>
                <CodeBracketIcon
                  className="text-white h-9 w-9"
                  onClick={openRepo}
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-16 space-y-8 animate__animated animate__fadeInUp">
        <div className="flex flex-row">
          {activeMod?.content?.media.map((media, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <img src={media} key={index.toString()} className="w-[128px] p-2" />
          ))}
        </div>
        <div className="flex">
          <p>{activeMod?.longDescription}</p>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="font-black">EXTRA INFORMATION</h2>
            <p>Transparency information about {activeMod?.name}</p>
          </div>
          {activeMod?.releaseDate && (
            <div>
              <h3>Release date</h3>
              <p>{activeMod?.releaseDate}</p>
            </div>
          )}
          {activeMod?.lastUpdated && (
            <div>
              <h3>Last updated</h3>
              <p>{activeMod?.lastUpdated}</p>
            </div>
          )}
          {activeMod?.previousVersions && (
            <div>
              <h3>Previously available versions</h3>
              <p>{activeMod?.previousVersions}</p>
            </div>
          )}
          {activeMod?.files && (
            <div>
              <h3>Content downloaded</h3>
              <h4>Paks</h4>
              {activeMod?.files?.map((file) => {
                if (file.type === 'Pak')
                  return <p key={file.id}>{file.name}</p>;
              })}
              <h4>Signatures</h4>
              {activeMod?.files?.map((file) => {
                if (file.type === 'Sig')
                  return <p key={file.id}>{file.name}</p>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstallMod;
