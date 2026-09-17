// PM2 Process Manager Configuration for Self-Hosted / Digital Gateway Deployment
module.exports = {
  apps: [
    {
      name: "dts-vacation-web",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      watch: false,
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "./logs/pm2-err.log",
      out_file: "./logs/pm2-out.log",
      combine_logs: true,
    },
  ],
};
