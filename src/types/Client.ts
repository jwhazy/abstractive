import { Mod } from './Mod';
import { Version } from './Version';

export type Client = {
  id: string;
  name: string;
  directory: string;
  version: Version;
  mods: Mod[];
};
