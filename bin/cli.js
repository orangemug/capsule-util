#!/usr/bin/env node
var yargs = require('yargs')

var argv = yargs
  .command(
    "history",
    "render some history", 
    require("./_history")
  )
  .demand(1)
  .help('help')
  .argv;

