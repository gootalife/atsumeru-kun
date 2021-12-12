import { Client, ClientEvents } from 'discord.js';
import { Command } from '../types/command';

const eventName = 'message';

const execute = (_client: Client, args: ClientEvents[typeof eventName]) => {
  const [message] = args;
  message.channel.send('Pong.');
};

export const module: Command<typeof eventName> = {
  name: 'ping',
  description: 'Ping!',
  execute: execute,
};
