import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadedTypeDefs = await loadFiles(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = await loadFiles(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(loadedResolvers);
