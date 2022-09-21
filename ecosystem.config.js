module.exports = {
  apps: [
    {
      name: 'EZ Member Frontend',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
