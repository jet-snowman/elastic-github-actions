import { registerWorkflow } from '../../src/workflow';

registerWorkflow({
  "name": "tests",
  "run-name": "Testing ${{ inputs.deploy_target }} by @${{ github.actor }}",
  "on": "push",
  "jobs": {
    "my-test": {
      "runs-on": "ubuntu-latest",
      "timeout-minutes": 30,
      "strategy": {
        "matrix": {
          "node-version": [
            "20.x"
          ],
          "mongodb-version": [
            "7.0"
          ],
          "redis-version": [
            "7.0"
          ]
        }
      },
      "steps": [
        {
          "name": "Get branch name (merge)",
          "if": "github.event_name != 'pull_request'",
          "shell": "bash",
          "run": "echo \"BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/} | tr / -)\" >> $GITHUB_ENV"
        },
        {
          "name": "Branch name",
          "run": "echo ${{ env.BRANCH_NAME }}"
        }
      ]
    }
  }
});
