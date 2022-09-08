import { Client } from './Client';

export type Config = {
  active: string;
  clients: Record<string, Client>;
};
