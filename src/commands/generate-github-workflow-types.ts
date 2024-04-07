import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';
import { compile, JSONSchema } from 'json-schema-to-typescript';

const URL = 'https://json.schemastore.org/github-workflow.json';
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'interfaces', 'generated-workflow.interface.ts');

(async () => {
  const jsonSchema = (await axios.get(URL)).data;
  const result = await compile(jsonSchema as JSONSchema, 'workflow.interface');
  await fs.writeFile(OUTPUT_PATH, result);
})();
