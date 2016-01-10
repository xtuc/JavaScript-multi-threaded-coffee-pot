/* @flow */
"use strict";

import Immutable from "immutable";

export default class APIError extends Immutable.Record({
	name: null,
	statusCode: null,
	message: null,
	details: null
}) {
}