import { dialog, invoke } from '@tauri-apps/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import Button from '../components/Button';
import versions from '../utils/versions';

function AddClient() {
  const [clientName, setClientName] = useState('');
  const [clientDirectory, setClientDirectory] = useState('');
  const [clientVersion, setClientVersion] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const filteredVersions =
    query === ''
      ? null
      : versions.filter((v) => v.toLowerCase().startsWith(query.toLowerCase()));

  const navigate = useNavigate();

  const goBack = () => navigate('/');

  const addClient = async () => {
    if (!clientName || !clientDirectory || !clientVersion)
      return setError('Make sure you have filled out all fields.');

    const exists = await invoke('exists', { path: clientDirectory });

    if (!exists) return setError('Directory does not exist.');

    invoke('add_client', {
      name: clientName,
      directory: clientDirectory,
      version: clientVersion,
      id: crypto.randomUUID(),
    }).then(() => (window.location.href = '/'));
  };

  const getDirectory = () => {
    dialog.open({ directory: true }).then((value) => {
      if (typeof value === 'string') {
        setClientDirectory?.(value as string);
      }
    });
  };

  return (
    <div className="flex h-[90vh]">
      <div className="m-auto space-y-4 w-1/2">
        <div className="animate__animated animate__fadeInDown">
          <h1>Add another client</h1>
          <p>Make sure you select the folder with FortniteGame and Engine</p>
        </div>
        <div className="animate__animated animate__fadeInUp space-y-2">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Client name (e.g. Fortnite 7.40)"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
              setError('');
            }}
            className="py-2 px-3 w-full focus:shadow-xl transition h-10 rounded-xl bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
          />
          <div className="flex space-y-2 flex-col">
            <Combobox value={clientVersion} onChange={setClientVersion}>
              <Combobox.Input
                placeholder="Client version (e.g. 8.51-CL-6165369)"
                className="py-2 px-3 w-full focus:shadow-xl transition h-10 rounded-xl bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Options className="flex rounded-xl flex-col transition bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent">
                {filteredVersions?.slice(0, 3).map((v) => (
                  <Combobox.Option key={v} value={v} className="py-2 px-3">
                    {v}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>

          <div className="flex space-x-2">
            <input
              id="directory"
              type="text"
              name="directory"
              placeholder="Client directory (e.g. C:\\8.51-CL-6165369)"
              value={clientDirectory}
              onChange={(e) => {
                setClientDirectory(e.target.value);
                setError('');
              }}
              className="py-2 px-3 w-full focus:shadow-xl h-10 transition rounded-xl bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
            />
            <Button className="m-0" onClick={getDirectory}>
              ...
            </Button>
          </div>

          {error && <p className="text-red-400">{error}</p>}
          <Button className="ml-0" onClick={addClient}>
            Add client
          </Button>
          <Button className="ml-0" onClick={goBack}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
