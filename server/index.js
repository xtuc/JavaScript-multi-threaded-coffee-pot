/* @flow */
"use strict";

import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import Console from "better-console"
import cache from "memory-cache"
import Immutable from "immutable"

import CoffeeRecord from "./models/Coffee";
import CoffeePotRecord from "./models/CoffeePot";

const app = express();
const numCPUs = require('os').cpus().length;

Console.debug("CoffePot set to", numCPUs, "concurrent coffees");

var coffeePot = new CoffeePotRecord()
						.set("concurrentCoffees", numCPUs);

coffeePot = coffeePot.set("coffees", coffeePot.get("coffees").push(new CoffeeRecord().set("milk", 50)));

cache.put("coffeePot", coffeePot);

// TEST
var Threads = require("webworker-threads");
const threadPool = Threads.createPool(numCPUs);

// Thread pure function
function doCoffee(coffee) {
	var coffee = JSON.parse(coffee);

	var d = new Date(coffee.startedAt).getTime() + 3000; // 3000 = brew duration
	while(new Date().getTime() <= d ) {
		// Coffee is brewing ...
	}

	coffee.brewing = false;
	coffee.finishedAt = new Date();

	return JSON.stringify(coffee);
}

threadPool.on('data', function(n) {
	console.log("onData", n);
})

threadPool.all.eval(doCoffee);

coffeePot.get("coffees").map((coffee) => {
	if(coffee.get("brewing")) return; // Already brewing

	coffee = coffee
				.set("brewing", true)
				.set("startedAt", new Date());

	threadPool.any.eval("doCoffee('"+ JSON.stringify(coffee.toJS()) +"')", function(err, val) {
		if(err) Console.error(err);
		// if(err) throw err;

		val = JSON.parse(val);

		console.log(new CoffeeRecord(val));
	});
});
// TEST

/**
 * Init cache & coffee pot
 */
app.use(function(req, res, next) {
	req.cache = cache;
	next();
});

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.post("/", require("./API/brew"));
app.get("/", require("./API/get"));

app.use(function(err, req, res, next) {
	Console.log(err);

	// Avoid null value in property acceptedvalues
	if(!err.acceptedValues) delete err.acceptedValues;

	res
		.status(err.statusCode || 500)
		.json(err);
});

const listener = app.listen(8080, (err) => {
	if(err) throw err;

	console.log("Server listening", listener.address().address, listener.address().port);
});