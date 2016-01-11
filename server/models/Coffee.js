/* @flow */
"use strict";

import Immutable from "immutable";
import {milkTypes, syrupTypes, alcoholTypes} from "./CoffeeOptionTypes";

export default class Coffee extends Immutable.Record({
	brewing: false,
	startedAt: false,
	milk: null,
	syrup: null,
	alcohol: null
}) {
	addMilk(type) {
		return this.set("milk", (this.get("milk")
						? this.get("milk") | type
						: type));
	}

	addSyrup(type) {
		return this.set("syrup", (this.get("syrup")
								? this.get("syrup") | type
								: type));
	}

	addAlcohol(type) {
		return this.set("alcohol", (this.get("alcohol")
						? this.get("alcohol") | type
						: type));
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
		if(this.get(type) === null) return array;

		var source;

		if(type === "milk") source = milkTypes.toJS()
		else if(type === "syrup") source = syrupTypes.toJS()
		else if(type === "alcohol") source = alcoholTypes.toJS()

		for(var i in source) {
			if(source[i] & this.get(type)) {
				array.push(i);
			}
		}

		return array;	
	}
}