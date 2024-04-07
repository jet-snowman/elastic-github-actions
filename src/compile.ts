import path from 'path';
import * as fs from 'node:fs/promises';
import { getWorkflows } from './workflow';
import yaml from 'js-yaml';

export async function compile(): Promise<void> {
  const config: { entry: string, output: string } = JSON.parse(await fs.readFile(path.resolve(process.cwd(), 'ega.config.json'), 'utf8'));
  await import(path.join(process.cwd(), config.entry));

  const workflows = getWorkflows();
  console.log(`Found workflows: ${workflows.length}`);

  await fs.mkdir(path.join(process.cwd(), config.output), { recursive: true });

  for await (const workflow of workflows) {
    const result = yaml.dump(workflow);
    await fs.writeFile(path.join(process.cwd(), config.output, `${workflow.name}.yml`), result, 'utf8');
  }
}

// TODO
compile();
