/* @flow */
"use strict";

import Immutable from "immutable";

export default class APIErrorRecord extends Immutable.Record({
	name: null,
	statusCode: null,
	message: null,
	details: null,
	acceptedValues: null,
}) {
}