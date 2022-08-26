import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node'
};
export default config;

// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//     testEnvironment: 'node'
//   };
// };

// const config = {
//   verbose: true,
//   testEnvironment: 'node'
// };