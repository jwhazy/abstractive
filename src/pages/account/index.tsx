import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { AppContext } from '../../components/Context';

function Account() {
  const { account } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex h-[80vh] justify-center lg:justify-start">
      <div className="pt-48 lg:m-48 lg:mx-64 lg:pt-0">
        <div className="animate__animated animate__fadeInUp space-y-4">
          <div className=" flex flex-col items-center space-y-2 lg:flex-row lg:space-x-10 lg:space-y-0">
            <div>
              <img
                src={
                  account?.avatar ||
                  'https://cdn.jacksta.dev/assets/newUser.png'
                }
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center space-y-2 text-center lg:text-start">
              <div>
                <h1 className="text-gray-200 font-black">
                  WELCOME BACK,
                  <a className="text-white">
                    {' '}
                    {account?.username.toUpperCase()}
                  </a>
                  .
                </h1>
                <p className="font-medium">What can we help you with today?</p>
              </div>
              <div>
                <Button
                  className="ml-0 mt-2 "
                  onClick={() => navigate('/logout')}
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
