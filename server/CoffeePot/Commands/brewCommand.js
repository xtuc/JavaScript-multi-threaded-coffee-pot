/* @flow */
"use strict";

import * as errors from "../../errors";
import {milkTypes, syrupTypes, alcoholTypes} from "../../Coffee/CoffeeOptionTypes";
import CoffeeRecord from "../../Coffee/CoffeeRecord";
import _ from "lodash";
import Immutable from "immutable";

import cache from "../../cache"
import CoffeeThread from "../CoffeeThread"

function createAdditionNotFoundException(addition: Object) {
	return errors.TypeNotFound
		.set("details", addition.name + " \"" + addition.value + "\" type not found")
		.set("acceptedValues", addition.data.keySeq());
}

module.exports = function (req: Object, res: Object, next: (err: ?error) => void) {
	const response = {};
	const additionType: String = req.get("addition-type");
	const coffeePot = cache.get("coffeePot");
	const coffees: Array = coffeePot.get("coffees") || [];

	if(coffees.count() >= coffeePot.get("concurrentCoffees"))
		return next(errors.Potbusy.set("details", coffees.count() + " are currently brewing"));

	var additions = [
		{ name: "sweetener-type", value: req.get("sweetener-type"), data: Immutable.Map() },
		{ name: "spice-type", value: req.get("spice-type"), data: Immutable.Map() },
		{ name: "milk-type", value: req.get("milk-type"), data: milkTypes },
		{ name: "syrup-type", value: req.get("syrup-type"), data: syrupTypes },
		{ name: "alcohol-type", value: req.get("alcohol-type"), data: alcoholTypes }
	];

	additions = _.filter(additions, (v) => {
		if(additionType === "*") return true;
		else if(additionType === v.name) return true;
		else return false;
	});

	/**
	 * Create new Coffee instance
	 */
	var coffee = new CoffeeRecord();

	additions.map((x) => {
		const value = x.data.get(x.value);

		if(value) coffee = coffee.add(x.name, value);
		else if (x.value == null) null;
		else return next(createAdditionNotFoundException(x));
	});

	if(coffee) {
		coffees.push(coffee);

		/**
		 * Start coffee worker
		 */
		const newcoffeePot = coffeePot.set("coffees", coffees);
		cache.put("coffeePot", newcoffeePot);

		if(CoffeeThread.run(coffee)) {
			return res.json(coffee.format());
		} else {
			return next(errors.Potbusy.set("details", coffees.count() + " are currently brewing"));
		}

		
	}
}