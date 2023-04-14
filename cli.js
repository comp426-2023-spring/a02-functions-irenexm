#!/usr/bin/env node

import moment from "moment-timezone";
import fetch from "node-fetch";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
console.log(args);

const timezone = moment.tz.guess() || args.j


if (args.h) {
    console.log(`
	Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
	    -h            Show this help message and exit.
	    -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive, W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
    `);
    process.exit(0);
} 


const latitude = args.n * 1.0 || -1.0 * args.s;
const longitude = args.e * 1.0 || -1.0 * args.w;
const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_hours&current_weather=true&timezone=${timezone}`
);
const data = await response.json();

const days = args.d;

if (days == 0) {
    console.log('today');
} else if (days > 1) {
    console.log(`in ${days} days.`);
} else {
    console.log('tomorrow');
}

const json = args.j;
if (json) {
    console.log(data);
}