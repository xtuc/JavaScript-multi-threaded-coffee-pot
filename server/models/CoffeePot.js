/* @flow */
"use strict";

import Immutable from "immutable";

export default class CoffeePot extends Immutable.Record({
	concurrentCoffees: 0,
	serveAlcohol: false
}) {
}