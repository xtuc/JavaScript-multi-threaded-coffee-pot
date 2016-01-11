/* @flow */
"use strict";

import * as errors from "../errors";

module.exports = function (req: Object, res: Object, next: (err: ?error) => void) {
	var coffees = [];

	if(req.cache.get("coffees"))
		coffees = req.cache.get("coffees").map(coffee => { return coffee.format() });

	return res.json(coffees);
}