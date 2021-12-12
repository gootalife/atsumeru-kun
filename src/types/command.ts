import { ClientEvents } from 'discord.js';
import { Client } from 'discord.js';

export interface Command<K extends keyof ClientEvents> {
  name: string;
  description: string;
  execute(client: Client, args: ClientEvents[K], commandArgs: string[]): void;
}
