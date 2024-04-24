# Elastic GitHub Actions

## Share your configs and steps between workflows. No classes and zero learning curve.

<p align="center">
    <img src="https://raw.githubusercontent.com/jet-snowman/elastic-github-actions/main/assets/tree.jpg" width="400">
</p>

![GitHub License](https://img.shields.io/github/license/jet-snowman/elastic-github-actions)

## Installation

```bash
npm install @jet-snowman/elastic-github-actions
```

## Overview

Leveraging TypeScript's flexibility enables seamless inclusion and sharing of entities across multiple files, eliminating redundancies and providing autocomplete for permitted settings in GitHub Actions.

## Getting Started

```bash
npx jet-ega
Usage: jet-ega [options] [command]

Generate GitHub Actions Workflow files using TypeScript (compiles to YAML and backward)

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init            Creates a config file
  tsToYaml        Compiles TS files to YAMLs
  yamlToTs        Compiles YAMLs to TS files
  help [command]  display help for command
```

```bash
npx jet-ega init
```

It creates `jet-ega.config.json` config file with the following structure: 
```json
{
  "ts": {
    "entry": "./examples/ts/index.ts",
    "output":  "./output/yaml"
  },
  "yaml": {
    "folder": "./examples/yaml",
    "output":  "./output/ts"
  }
}
```
You have the flexibility to specify the entry TypeScript file for generating GitHub Action workflow YAML files. Moreover, it offers the ability to effortlessly convert existing YAML files into TypeScript files.

When you are done with the config file.

TS files to YAML files
```bash
npx jet-ega tsToYaml
```
OR

YAML files to TS files
```bash
npx jet-ega yamlToTs
```

## Simple Example

```typescript
import { registerWorkflow } from '@jet-snowman/elastic-github-actions';

registerWorkflow({
  name: 'tests',
  'run-name': 'Testing ${{ inputs.deploy_target }} by @${{ github.actor }}',
  on: 'push',
  jobs: {
    'my-test': {
      'runs-on': 'ubuntu-latest',
      'timeout-minutes': 30,
      strategy: {
        matrix: {
          'node-version': [
            '20.x'
          ],
          'mongodb-version': [
            '7.0'
          ],
          'redis-version': [
            '7.0'
          ]
        }
      },
      steps: [
        {
          name: 'Get branch name (merge)',
          'if': 'github.event_name != \'pull_request\'',
          shell: 'bash',
          run: 'echo "BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/} | tr / -)" >> $GITHUB_ENV'
        },
        {
          name: 'Branch name',
          run: 'echo ${{ env.BRANCH_NAME }}'
        }
      ]
    }
  }
});
```

## Advanced Example

```typescript
import { NormalJob, registerWorkflow, toMultiRun } from '@jet-snowman/elastic-github-actions';

interface AwsService {
  id: string;
  name: string;
  env: string;
  taskFile: string;
  service: string;
}

const apiService: AwsService = {
  id: 'task-api-def',
  name: 'API',
  env: 'API_TASK',
  taskFile: 'api.json',
  service: 'api',
};

const jobs: { deploy: NormalJob } = {
  deploy: {
    'runs-on': 'ubuntu-latest',
    'timeout-minutes': 30,
    strategy: {
      matrix: {
        region: [
          'us-west-2'
        ]
      }
    },
    steps: []
  }
};

//download tasks
const tasks: string[] = [];
for (const service of services) {
  tasks.push(`aws ecs describe-task-definition --task-definition $${service.env} --query taskDefinition > ${service.taskFile}`);
}

jobs.deploy.steps.push({
  name: 'Download task definitions',
  run: tasks.join('\n') + '\n'
});

registerWorkflow({
  name: 'deploy',
  'run-name': 'Deploying to AWS by @${{ github.actor }}',
  on: {
    push: {
      branches: [
        'production'
      ]
    },
    workflow_run: {
      branches: [
        'staging',
        'production'
      ],
      types: [
        'completed'
      ]
    }
  },
  concurrency: {
    group: '${{ github.workflow }}-${{ github.ref }}',
    'cancel-in-progress': true
  },
  jobs
});
```
With TypeScript, you can seamlessly organize your code the way you want or integrate it into your existing project without any hassles

## Helpers

`toMultiRun()` - aids in writing multiline yaml like this:
```yaml
name: Test
run: |
  command 1
  command 2
```
## License
This project is licensed under the MIT License

