import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { AppContext } from '../components/Context';
import { Mod } from '../types/Mod';

function InstallMod() {
  const { mods, activeClient } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeMod, setActiveMod] = useState<Mod>();

  const navigate = useNavigate();

  const goBack = () => navigate('/');
  const openRepo = () => open(activeMod?.repository || '');

  const install = async () => {
    console.log(activeClient?.id, activeMod?.id);
    await invoke('install_mod', {
      modId: activeMod?.id,
      clientId: activeClient?.id,
    });
    window.location.href = '/';
  };

  const uninstall = async () => {
    console.log(activeClient?.id, activeMod?.id);
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
    <div className="space-y-8 animate__animated animate__fadeInLeft">
      <img
        src={activeMod?.content?.banner}
        className="w-full h-[300px] object-cover object-center"
      />

      <div className="flex justify-center space-x-8 w-1/2">
        <div onClick={goBack}>
          <ArrowSmallLeftIcon className="w-8 h-8" />
        </div>
        <img src={activeMod?.content?.icon} className="rounded-xl w-32 h-32" />
        <div className="flex flex-col justify-around">
          <div>
            <h1>{activeMod?.name}</h1>
            <p className="text-gray-200 tracking-widest">
              {activeMod?.author} •{activeMod?.version}
            </p>
          </div>
          <div className="space-x-4">
            {!activeClient?.mods?.find((m) => m.id === activeMod?.id) ? (
              <Button className="m-0" onClick={install}>
                Install
              </Button>
            ) : (
              <Button className="m-0" onClick={uninstall}>
                Uninstall
              </Button>
            )}
            {!activeClient?.mods?.find((m) => m.id === activeMod?.id) ? (
              <Button className="m-0">Report</Button>
            ) : (
              <Button className="m-0">Settings</Button>
            )}

            {activeMod?.repository ? (
              <Button className="m-0" onClick={openRepo}>
                Source code
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-16 space-y-8">
        <div className="flex flex-row">
          {activeMod?.content?.media.map((media) => (
            <img src={media} key={media} className="w-[128px] p-2" />
          ))}
        </div>
        <div className="flex">
          <p>{activeMod?.longDescription}</p>
        </div>
        <div className="space-y-4">
          <div>
            <h3>Extra information</h3>
            <p>
              Transparency information about
              {activeMod?.name}
            </p>
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
                <p key={file.id}>
                  {file.name} • {file.type}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstallMod;
