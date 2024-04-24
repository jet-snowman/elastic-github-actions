#!/usr/bin/env node

import { program } from 'commander';
import { createConfig, registerTsNode } from './utils';
import { tsToYaml } from './commands/ts-to-yaml';
import { yamlToTs } from './commands/yaml-to-ts';

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
    registerTsNode({ transpileOnly: true });
    await tsToYaml();
  });

program.command('yamlToTs')
  .description('Compiles YAMLs to TS files')
  .action(async () => {
    await yamlToTs();
  });

program.parse();
