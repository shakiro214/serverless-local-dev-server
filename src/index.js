'use strict'

const Server = require('./Server.js')

class ServerlessLocalDevServerPlugin {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options || {}

    this.commands = {
      'offline-plus-static': {
        usage: 'Develop Serverless endpoints with static files offline',
        lifecycleEvents: [ 'loadEnvVars', 'start' ],
        options: {
          port: { usage: 'Port to listen on', shortcut: 'p' }
        }
      }
    }

    this.hooks = {
      'offline-plus-static:loadEnvVars': this.loadEnvVars.bind(this),
      'offline-plus-static:start': this.start.bind(this)
    }
  }

  loadEnvVars () {
    Object.assign(process.env, { IS_LOCAL: true })
  }

  start () {
    let server = new Server()
    server.log = this.serverless.cli.log.bind(this.serverless.cli)
    Object.assign(server.customEnvironment, this.options.environment)
    server.setConfiguration(this.serverless.service, this.serverless.config.servicePath)
    server.start(this.options.port || 3000)
  }
}

module.exports = ServerlessLocalDevServerPlugin
