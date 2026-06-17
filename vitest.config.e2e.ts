import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    hookTimeout: 60000, // 60 segundos para cada hook (beforeAll, beforeEach, afterAll, afterEach)
    testTimeout: 60000, // 60 segundos para cada teste
    fileParallelism: false, // 1 arquivo por vez para evitar problemas de concorrência com banco de dados
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
