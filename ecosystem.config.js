module.exports = {
  apps: [
    {
      name: 'megumin', // Replace with your app's name
      script: './src/server.js', // Main entry file
      instances: 1, // Number of instances you want to run
      autorestart: true, // Restart the app on crashes
      watch: false, // Set to true to watch for file changes and restart
      max_memory_restart: '1G', // Maximum memory limit for restarting
      env: {
        NODE_ENV: 'production', // Environment mode
      },
    },
  ],
};
