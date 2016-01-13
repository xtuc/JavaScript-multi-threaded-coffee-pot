/* @flow */
"use strict";

import Immutable from "immutable";
import events from "events";
import _ from "lodash";

export default class CoffeePotRecord extends Immutable.Record({
	concurrentCoffees: 0,
	serveAlcohol: false,
	queingCoffees: new Immutable.List(),
	coffees: new Immutable.List(),
}) {
}