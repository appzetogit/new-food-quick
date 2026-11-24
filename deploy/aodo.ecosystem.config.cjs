// Aodo on the shared VPS. Only ever touch these two names:
//   pm2 startOrReload deploy/aodo.ecosystem.config.cjs
const base = {
  cwd: '/opt/new-food-quick/Backend',
  exec_mode: 'fork', // schedulers and sockets are singletons
  instances: 1,
  uid: 'www-data', // not root: this box is shared
  gid: 'www-data',
  max_restarts: 10,
  min_uptime: '20s',
  merge_logs: true,
  time: true,
  env: { NODE_ENV: 'production', HOME: '/opt/new-food-quick' },
};
module.exports = {
  apps: [
    { ...base, name: 'new-food-quick-api', script: 'server.js', node_args: '--max-old-space-size=384', max_memory_restart: '500M', kill_timeout: 12000 },
    { ...base, name: 'new-food-quick-workers', script: 'src/queues/workers/index.js', node_args: '--max-old-space-size=192', max_memory_restart: '300M', kill_timeout: 20000 },
  ],
};
