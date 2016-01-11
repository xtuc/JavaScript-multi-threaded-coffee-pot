/* @flow */
"use strict";

import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import Console from "better-console"
import cache from "memory-cache"

const app = express();

/**
 * Init cache
 */
app.use(function(err, req, res, next) {
	req.cache = cache;
	next();
});

app.use(morgan('combined'));
app.use(bodyParser());
app.use(methodOverride());

app.post("/", require("./API/brew"));
app.get("/", require("./API/get"));

app.use(function(err, req, res, next) {
	Console.log(err);

	res
		.status(err.statusCode || 500)
		.json(err);
});

const listener = app.listen(8080, (err) => {
	if(err) throw err;

	console.log("Server listening", listener.address().address, listener.address().port);
});