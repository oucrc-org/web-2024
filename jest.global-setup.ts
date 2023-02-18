import { loadEnvConfig } from '@next/env';

/**
 * .env.testを読む
 * @see https://zenn.dev/tkengineer/articles/8cf29c7c8131ba
 */
export default async function loadEnv() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
}
