import { Mod } from "./Mod";
import { Version } from "./Version";

export type Client = {
  id: string;
  name: String;
  directory: String;
  version: Version;
  mods: Mod[];
};
