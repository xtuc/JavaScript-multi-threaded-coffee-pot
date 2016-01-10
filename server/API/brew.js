/* @flow */
"use strict";

import * as errors from "../errors";
import Immutable from "immutable";
import CoffeeRecord from "../models/Coffee";

module.exports = function (req: Object, res: Object, next: (err: ?error) => void) {
	const additionType = req.get("addition-type");
	const milkType = req.get("milk-type");
	const syrupType = req.get("syrup-type");
	const alcoholType = req.get("alcohol-type");

	var coffee = new CoffeeRecord();

	if(milkType) coffee = addMilk(coffee, milkType);

	var response = {};

	response.addition = [];

	response.response = milkTypes.get("Cream") | milkTypes.get("Skim");
	response.coffee = coffee.toJS();

	res.json(response);
}

function addMilk(coffee, type) {
	return coffee.set("milk", type);
}

const milkTypes = new Immutable.Map([
	["Cream", 0x1],
	["Half-and-half", 0x2],
	["Whole-milk", 0x4],
	["Part-Skim", 0x8],
	["Skim", 0x16],
	["Non-Dairy", 0x32]
]);

const syrupTypes = new Immutable.Map([
	["Vanilla", 0x1],
	["Almond", 0x2],
	["Raspberry", 0x4],
	["Chocolate", 0x8],
]);

const alcoholTypes = new Immutable.Map([
	["Whisky", 0x1],
	["Rum", 0x2],
	["Kahlua", 0x4],
	["Aquavit", 0x8],
]);