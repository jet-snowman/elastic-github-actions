import * as tsNode from 'ts-node';

let tsNodeInit = false;

export const registerTsNode = (options = {}): void => {
  if (tsNodeInit) return;

  tsNode.register({ ...options });
  tsNodeInit = true;
};
