import { ClientEvents } from 'discord.js';
import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { dynamicImport } from './lib/dynamicImport';
import { Command } from './types/command';
import { Event } from './types/event';

(async () => {
  dotenv.config();
  const client = new Client();
  client.events = await dynamicImport<Event<keyof ClientEvents>>(`${__dirname}/events`);
  client.commands = await dynamicImport<Command<keyof ClientEvents>>(`${__dirname}/commands`);
  // イベントとコマンドの登録
  Object.keys(client.events).forEach(eventName => {
    const event = client.events[eventName];
    if (event.once) {
      // 起動時
      client.once(event.name, (...args) => event.execute(client, args));
      console.log(`[once] added ${event.name}`);
    } else {
      // イベント毎
      client.on(event.name, (...args) => event.execute(client, args));
      console.log(`[on] added ${event.name}`);
    }
  });

  // bot起動
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
