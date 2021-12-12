import * as fs from 'fs/promises';

interface Module {
  name: string;
}

export const dynamicImport = async <T extends Module>(path: string): Promise<{ [name: string]: T }> => {
  const modules: { [name: string]: T } = {};
  try {
    const files = await fs.readdir(path);
    for (const file of files.filter(file => file.endsWith('.js'))) {
      const module = (await import(`${path}/${file}`)).module as T;
      modules[module.name] = module;
    }
  } catch (err) {
    console.error(err);
  }
  return modules;
};
