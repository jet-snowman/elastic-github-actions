import { Workflow } from './interfaces';

const workflows: Workflow[] = [];

export function registerWorkflow(workflow: Workflow) {
  workflows.push(workflow);
}

export function getWorkflows(): Workflow[] {
  return workflows;
}
