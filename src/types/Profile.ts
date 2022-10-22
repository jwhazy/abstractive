import { Mod } from './Mod';

type Profile = {
  id: string;
  username: string;
  avatar: string;
  banner?: string;
  bio?: string;
  followers: number;
  following: number;
  mods: string[];
};

export default Profile;
