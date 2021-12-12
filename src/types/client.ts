import { Command } from './command';
import { Event } from './event';

declare module 'discord.js' {
  interface Client {
    commands: { [name: string]: Command<keyof ClientEvents> };
    events: { [name: string]: Event<keyof ClientEvents> };
  }
}
