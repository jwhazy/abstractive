import {
  ArrowRightOnRectangleIcon,
  ArrowSmallLeftIcon,
  Cog8ToothIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../components/Context';
import Link from '../components/Link';
import ModRow from '../components/ModRow';
import Profile from '../types/Profile';

function AuthorPage() {
  const { account } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const [author, setAuthor] = useState<Profile>();

  const [self, setSelf] = useState<boolean>(false);

  const navigate = useNavigate();

  const logout = () => navigate('/logout');

  const goBack = () => navigate(-1);

  useEffect(() => {
    setAuthor({
      id: account?.id as string,
      username: account?.username as string,
      avatar: account?.avatar as string,
      bio: 'JACKSTA DEVELOPMENt, Software development in JavaScript, C# and Python.',
      banner:
        'https://pbs.twimg.com/profile_banners/809567214261051392/1664025224/1500x500',
      followers: 10,
      following: 10,
      mods: [
        '6cbb1815-4f67-4d7c-a588-795f626919f5',
        'c118e510-cc12-41f8-af03-3ba024eea86a',
      ],
    });

    if (author?.id !== searchParams.get('id')) setSelf(true);
  }, [
    account?.avatar,
    account?.id,
    account?.username,
    author?.id,
    searchParams,
  ]);
  return (
    <div className="space-y-8 -mt-16">
      <img
        src={author?.banner}
        className="w-full h-[400px] object-cover object-center animate__animated animate__fadeInDown"
      />

      <div className="flex justify-center space-x-8 w-1/2 animate__animated animate__fadeInUp">
        <div onClick={goBack}>
          <ArrowSmallLeftIcon className="w-8 h-8 cursor-pointer" />
        </div>
        <img src={author?.avatar} className="rounded-full w-32 h-32" />
        <div className="flex flex-col justify-between ">
          <div>
            <div>
              <h1 className="font-black">{author?.username?.toUpperCase()}</h1>
            </div>
            <div className="space-x-4 flex">
              <div>
                <p className="text-gray-200 tracking-widest">FOLLOWERS</p>
                <p className="font-black">{author?.followers}</p>
              </div>
              <div>
                <p className="text-gray-200 tracking-widest">FOLLOWING</p>
                <p className="font-black">{author?.following}</p>
              </div>
            </div>
          </div>
          <div className="space-x-2 pt-2 flex">
            {self ? (
              <>
                <Link>
                  <PencilIcon className="text-white h-6 w-6" />
                </Link>
                <Link>
                  <Cog8ToothIcon className="text-white h-6 w-6" />
                </Link>
                <Link>
                  <ArrowRightOnRectangleIcon
                    className="text-white h-6 w-6"
                    onClick={logout}
                  />
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-16 animate__animated animate__fadeInUp">
        <div className="space-x-4 flex">
          <div className="w-full">
            <h2 className="font-black pb-2">MODS</h2>
            <div className="space-y-2">
              {author?.mods?.map((mod) => (
                <ModRow key={mod} mod={mod} />
              ))}
            </div>
          </div>
          <div className="w-full">
            <h2 className="font-black pb-2">RECENT ACTIVITY</h2>
            <div className="space-y-2">
              {author?.mods?.map((mod) => (
                <ModRow key={mod} mod={mod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;
