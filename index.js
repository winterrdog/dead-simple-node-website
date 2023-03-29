#!/usr/bin/env node

const { SimpleServer } = require("./simple_server");

const server = new SimpleServer(process.env.PORT || 9090);
server.run();
