import { program } from 'commander';
import { tsToYaml } from './ts-to-yaml';
import { yamlToTs } from './yaml-to-ts';
import { createConfig } from '../utils';

program
  .name('jet-ega')
  .description('Generate GitHub Actions Workflow files using TypeScript (compiles to YAML and backward)')
  .version('1.0.0');

program.command('init')
  .description('Creates a config file')
  .action(async () => {
    await createConfig();
  });

program.command('tsToYaml')
  .description('Compiles TS files to YAMLs')
  .action(async () => {
    await tsToYaml();
  });

program.command('yamlToTs')
  .description('Compiles YAMLs to TS files')
  .action(async () => {
    await yamlToTs();
  });

program.parse();
