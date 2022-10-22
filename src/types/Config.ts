import { Account } from './Account';
import { Client } from './Client';

export type Config = {
  account: Account;
  active: string;
  clients: Record<string, Client>;
};
