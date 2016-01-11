/* @flow */
"use strict";

import * as errors from "../errors";
import {milkTypes, syrupTypes, alcoholTypes} from "../models/CoffeeOptionTypes";
import CoffeeRecord from "../models/Coffee";

module.exports = function (req: Object, res: Object, next: (err: ?error) => void) {
	const additionType = req.get("addition-type");
	const milkType = req.get("milk-type");
	const syrupType = req.get("syrup-type");
	const alcoholType = req.get("alcohol-type");

	const log = [];
	const response = {};

	/**
	 * Create new Coffee instance
	 */
	var coffee = new CoffeeRecord();

	/**
	 * Add syrup
	 */
	if(milkType) {
		const milk = milkTypes.get(milkType);

		log.push("Added milkType " + milkType);

		if(milk) coffee = coffee.addMilk(milk);
		else return next(errors.NotAcceptable.set("details", "Milk \"" + milk + "\" type not found"));
	}

	if(syrupType) {
		const syrup = syrupTypes.get(syrupType);

		log.push("Added syrupType " + syrupType);

		if(syrup) coffee = coffee.addSyrup(syrup);
		else return next(errors.NotAcceptable.set("details", "Syrup \"" + syrup + "\" type not found"));
	}

	if(alcoholType) {
		const alcohol = alcoholTypes.get(alcoholType);

		log.push("Added alcoholType " + alcoholType);

		if(alcohol) coffee = coffee.addAlcohol(alcohol);
		else return next(errors.NotAcceptable.set("details", "Syrup \"" + alcohol + "\" type not found"));
	}

	/**
	 * Start brewing coffee
	 */
	coffee = coffee
				.set("brewing", true)
				.set("startedAt", new Date());

	const coffees = req.cache.get("coffees") || [];

	coffees.push(coffee);

	/**
	 * Set coffee in cache
	 */
	req.cache.put("coffees", coffees);

	res.json(response);
}