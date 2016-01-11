/* @flow */
"use strict";

import * as errors from "../errors";

module.exports = function (req: Object, res: Object, next: (err: ?error) => void) {
	var response = [];
	const coffees = req.cache.get("coffees");

	if(coffees && coffees.length > 0)
		response = req.cache.get("coffees").map(coffee => { return coffee.format() });

	return res.json(response);
}