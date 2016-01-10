/* @flow */
"use strict";

import Immutable from "immutable";
import APIError from "./models/APIErrorModel"

export const NotAcceptable: error = new APIError({
	statusCode: 406,
	message: "Not Acceptable"
});

export const ImATeapot: error = new APIError({
	statusCode: 418,
	message: "I'm a teapot"
});