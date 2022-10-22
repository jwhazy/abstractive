import { Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../../components/Link';

function Welcome() {
  const navigate = useNavigate();

  const start = () => navigate('/welcome/client');

  return (
    <div className="flex justify-center h-[75vh]">
      <div className="m-auto text-center space-y-4 animate__animated animate__fadeInUp">
        <div>
          <h2 className="font-black">WELCOME TO</h2>
          <h1 className="text-6xl font-black">ABSTRACTIVE</h1>
        </div>
        <div className="flex justify-end">
          <Link onClick={start}>
            Get started <ChevronRightIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
