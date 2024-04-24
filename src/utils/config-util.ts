import { JetEgaConfigInterface } from '../interfaces/jet-ega-config.interface';
import fs from 'node:fs/promises';
import path from 'path';

let configUtil: JetEgaConfigInterface;

const CONFIG_FILENAME = 'jet-ega.config.json';

export async function createConfig(): Promise<void> {
  const filename = path.resolve(process.cwd(), CONFIG_FILENAME);
  if (await exists(filename)) {
    throw new Error(`Config already exists`);
  }

  const config: JetEgaConfigInterface = {
    ts: {
      entry: "./source/index.ts",
      output:  "./workflows/yaml"
    },
    yaml: {
      folder: "./github/workflows",
      output:  "./workflows/ts"
    }
  }

  await fs.writeFile(filename, JSON.stringify(config, null, 2), 'utf8');
  console.log(`Output: ${filename}`);
}

export async function loadConfig(): Promise<JetEgaConfigInterface> {
  if (configUtil) return configUtil;

  configUtil = JSON.parse(await fs.readFile(path.resolve(process.cwd(), CONFIG_FILENAME), 'utf8'));
  return configUtil;
}

async function exists(file: string) {
  try {
    await fs.stat(file);
    return true;
  } catch {
    return false;
  }
}
