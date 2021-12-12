import { Client, ClientEvents } from 'discord.js';
import { constValues } from '../lib/constValues';
import { Event } from '../types/event';

const prefix = constValues.commadPrefix;
const eventName = 'message';

const execute = (client: Client, args: ClientEvents[typeof eventName]) => {
  if (!args[0].content.startsWith(prefix) || args[0].author.bot) {
    return;
  }
  const commandArgs = args[0].content.slice(prefix.length).trim().split(/ +/);
  const commandStr = commandArgs.shift()?.toLowerCase();
  if (!commandStr) {
    return;
  }
  const command = client.commands[commandStr];
  // 未定義は無視
  if (!command) {
    return;
  }

  // コマンド実行
  try {
    command.execute(client, args, commandArgs);
  } catch (error) {
    console.error(error);
    args[0].reply('there was an error trying to execute that command!');
  }
};

export const module: Event<typeof eventName> = {
  name: eventName,
  once: false,
  execute: execute,
};
