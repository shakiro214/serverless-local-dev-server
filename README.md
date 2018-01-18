Serverless Local Dev Server Plugin (Beta)
=======

Develop Serverless endpoints with static files locally.

Supported features:

* Environment variables
* Basic HTTP integration
* Auto reload via nodemon (see *How To*)

This package requires node >= 6.0


# How To

### 1. Install the plugin

```sh
npm install serverless-local-server-plus-static --save-dev
```

### 2. Add the plugin to your serverless configuration file

*serverless.yml* configuration example:

```yaml
provider:
  name: aws
  runtime: nodejs6.10

functions:
  hello:
    handler: handler.hello
    events:
      - alexaSkill
      - http: GET /hello

# Add serverless-local-server-plus-static to your plugins:
plugins:
  - serverless-local-server-plus-static

# if needed add folder for serving static files if necessary (relative to service path)
custom:
  localDevStaticFolder: path/to/static/files
```



### 3. Start the server

```sh
serverless local-dev-server
```

On default the server listens on port 5005. You can specify another one with the *--port* argument:

```sh
serverless local-dev-server --port 5000
```

To automatically restart the server when files change, you may use nodemon:

```sh
nodemon --exec "serverless local-dev-server" -e "js yml json"
```

To see responses returned from Lambda and stack traces, prepend SLS_DEBUG=*

```sh
SLS_DEBUG=* serverless local-http-server
```

### 4. For Alexa Skills

#### 4.1 Share localhost with the internet

For example with forwardhq:

```sh
forward 5005
```

#### 4.2 Configure AWS to use your HTTPS endpoint

In the Configuration pane, select HTTPS as service endpoint type and specify the forwarded endpoint URL.

As method for SSL Certificate validation select *My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority*.


# License & Credits

Licensed under the MIT license.

Created and maintained by [DieProduktMacher](http://www.dieproduktmacher.com).
