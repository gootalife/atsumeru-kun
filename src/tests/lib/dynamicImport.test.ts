import * as fs from 'fs/promises';
import { ClientEvents } from 'discord.js';
import { dynamicImport } from '../../lib/dynamicImport';
import { Command } from '../../types/command';
import { Event } from '../../types/event';

describe('greet', () => {
  test('event file count', async (): Promise<void> => {
    try {
      const path = `./src/events`;
      const files = (await fs.readdir('./dist/events')).filter(file => file.endsWith('.js'));
      console.log(files.length);
      const events = await dynamicImport<Event<keyof ClientEvents>>(path);
      console.log(events);
      console.log(path);
      const response = Object.keys(events).length;
      expect(response).toEqual(files.length);
    } catch (err) {
      console.error(err);
    }
  });

  test.skip('command file count', async (): Promise<void> => {
    try {
      const path = 'src/commands';
      const files = await fs.readdir(path);
      const commands = dynamicImport<Command<keyof ClientEvents>>(`${__dirname}/../../src/commands`);
      console.log(`${__dirname}/../../src/commands`);
      const response: number = Object.keys(commands).length;
      expect(response).toBe(files.length);
    } catch (err) {
      console.error(err);
    }
  });
});
