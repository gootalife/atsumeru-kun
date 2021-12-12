import { Client, ClientEvents } from 'discord.js';

export interface Event<K extends keyof ClientEvents> {
  name: keyof ClientEvents;
  once: boolean;
  execute(client: Client, args: ClientEvents[K]): void;
}
