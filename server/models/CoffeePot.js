/* @flow */
"use strict";

import Immutable from "immutable";
import events from "events";
import _ from "lodash";

export default class CoffeePot extends Immutable.Record({
	concurrentCoffees: 0,
	serveAlcohol: false,
	coffees: new Immutable.List()
}) {
}