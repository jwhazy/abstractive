import { Content } from "./Content";
import { Version } from "./Version";

export type Mod = {
  id: string;
  name?: String;
  shortDescription?: String;
  longDescription?: String;
  versions?: Version[];
  content?: Content[];
  author?: String;
  contributors?: String[];
  repository?: String;
};
