/* @flow */
"use strict";

import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import Console from "better-console"
import Immutable from "immutable"

import cache from "./cache"

import CoffeeRecord from "./Coffee/CoffeeRecord";
import CoffeePotRecord from "./CoffeePot/CoffeePotRecord";
const numCPUs = require('os').cpus().length;

const app = express();

var coffeePot = new CoffeePotRecord()
						.set("concurrentCoffees", numCPUs);
						
cache.put("coffeePot", coffeePot);

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.post("/", require("./CoffeePot/Commands/brewCommand"));
app.get("/", require("./CoffeePot/Commands/getCommand"));

app.use(function(err, req, res, next) {
	Console.error(err);

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