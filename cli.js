#!/usr/bin/env node

//import minimist from "minimist"; alt way to import
const minimist = require('minimist');
const fetch = require('node-fetch');
const moment = require('moment-timezone');

const timezone = moment.tz.guess()

const args = minimist(process.argv.slice(2));
console.log(args);



