/* @flow */
"use strict";

import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import Console from "better-console"
import cache from "memory-cache"

import CoffeeRecord from "./models/Coffee";
import CoffeePotRecord from "./models/CoffeePot";

const app = express();

const numCPUs = require('os').cpus().length;

Console.debug("CoffePot set to", numCPUs, "concurrent coffees");

var coffeePot = new CoffeePotRecord();

/**
 * Init cache & coffee pot
 */
app.use(function(req, res, next) {
	req.cache = cache;
	req.coffeePot = coffeePot
						.set("concurrentCoffees", numCPUs);

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