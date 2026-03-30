const { spawnSync } = require('node:child_process');

const nextCli = require.resolve('next/dist/bin/next');

const result = spawnSync(process.execPath, [nextCli, 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_OUTPUT_MODE: 'export',
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
