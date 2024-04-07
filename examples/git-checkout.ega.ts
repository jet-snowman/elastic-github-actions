import { registerWorkflow } from '../src/workflow';

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
          'node-version': ['20.x'],
          'mongodb-version': ['7.0'],
          'redis-version': ['7.0']
        }
      },
      steps: [
        {
          name: 'Git checkout',
          run: 'actions/checkout@v3'
        }
      ]
    }
  }
});
