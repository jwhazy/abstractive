import { Content } from './Content';
import { Version } from './Version';
import { File } from './File';

export type Mod = {
  id: string;
  version: string;
  name?: string;
  shortDescription?: string;
  longDescription?: string;
  clients?: Version[];
  content?: Content;
  files?: File[];
  releaseDate?: string;
  lastUpdated?: string;
  previousVersions?: string[];
  author?: string;
  authorId: string;
  contributors?: string[];
  repository?: string;
};
