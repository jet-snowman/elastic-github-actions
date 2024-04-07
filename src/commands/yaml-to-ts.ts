import { loadConfig } from '../utils';
import { glob } from 'fast-glob';
import yaml from 'js-yaml';
import fs from 'node:fs/promises';
import { Workflow } from '../interfaces';
import path from 'path';

export async function yamlToTs(): Promise<void> {
  const config = await loadConfig();
  if (!config?.yaml) throw 'No YAML config provided';

  await fs.mkdir(path.join(process.cwd(), config.yaml.output), { recursive: true });

  const files = glob.stream(`${config.yaml!.folder}/**/*.yml`);
  for await (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    const result = yaml.load(content) as Workflow;
    const dist = `${config.yaml.output}/${result.name}.ts`;
    const tsContent = `import { registerWorkflow } from '@jet-snowman/elastic-github-actions';\nregisterWorkflow(${JSON.stringify(result, null, 2)});`;
    await fs.writeFile(dist, tsContent, 'utf8');
    console.log(`Output: ${dist}`);
  }
}
