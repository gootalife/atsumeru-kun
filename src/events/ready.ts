import { Event } from '../types/event';

const eventName = 'ready';

const execute = () => {
  console.log('atsumeru-kun is ready!');
};

export const module: Event<typeof eventName> = {
  name: eventName,
  once: true,
  execute: execute,
};
