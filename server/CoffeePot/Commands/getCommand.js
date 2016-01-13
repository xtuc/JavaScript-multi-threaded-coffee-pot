/* @flow */
"use strict";

import * as errors from "../../errors";

import cache from "../../cache"

module.exports = function (req: Object, res: Object, next: (err: ?error) => void) {
	var response = [];
	const coffees = cache.get("coffees");

	if(coffees && coffees.length > 0)
		response = cache.get("coffees").map(coffee => { return coffee.format() });

	return res.json(response);
}