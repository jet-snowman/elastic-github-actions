import path from 'path';
import * as fs from 'node:fs/promises';
import { getWorkflows } from '../workflow';
import yaml from 'js-yaml';
import { loadConfig } from '../utils';

export const TEMPLATE = [
  '# ------------DO-NOT-MODIFY-THIS-FILE------------',
  '# This file was automatically generated by jet-ega',
  '',
  '{{content}}',
]

export async function tsToYaml(): Promise<void> {
  const config = await loadConfig();
  await import(path.join(process.cwd(), config.ts.entry));

  const workflows = getWorkflows();
  console.log(`Found workflows: ${workflows.length}`);

  await fs.mkdir(path.join(process.cwd(), config.ts.output), { recursive: true });

  for await (const workflow of workflows) {
    const result = yaml.dump(workflow, { noCompatMode: true, lineWidth: -1 });
    const dist = path.join(process.cwd(), config.ts.output, `${workflow.name}.yml`);
    await fs.writeFile(dist, TEMPLATE.join('\n').replace('{{content}}', result), 'utf8');
    console.log(`Output: ${dist}`);
  }
}
