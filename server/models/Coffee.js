/* @flow */
"use strict";

import Immutable from "immutable";
import {milkTypes, syrupTypes, alcoholTypes} from "./CoffeeOptionTypes";

export default class Coffee extends Immutable.Record({
	brewing: false,
	startedAt: false,
	milk: 0x00,
	syrup: 0x00,
	alcohol: 0x00
}) {
	add(k, v) {
		if(k.indexOf("-type") !== -1) k = k.replace("-type", "");

		return this.set(k, (this.get(k)
						? this.get(k) + v
						: v));
	}

	format() {
		return {
			brewing: this.get("brewing"),
			startedAt: this.get("startedAt"),
			addition: this.getAdditions(),
		}
	}

	getAdditions() {

		return {
			milk: this.getOptions("milk"),
			syrup: this.getOptions("syrup"),
			alcohol: this.getOptions("alcohol")
		}	
	}

	getOptions(type) {
		const array = [];

		// No value
		if(this.get(type) === 0x00) return array;

		var source;

		if(type === "milk") source = milkTypes
		else if(type === "syrup") source = syrupTypes
		else if(type === "alcohol") source = alcoholTypes
		else return array;

		source = source.toJS();

		for(var i in source) {
			var result = source[i] & this.get(type);
			if(result !== 0 && result === this.get(type)) array.push(i);
		}

		return array;	
	}
}