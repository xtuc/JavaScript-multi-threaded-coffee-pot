/* @flow */
"use strict";

import Immutable from "immutable";
import APIError from "./models/APIErrorModel"
import {milkTypes, syrupTypes, alcoholTypes} from "./models/CoffeeOptionTypes"

export const NotAcceptable: object = new APIError({
	statusCode: 406,
	message: "Not Acceptable"
});

export const MilkTypeNotFound: error = NotAcceptable.set("acceptedValues", milkTypes.keySeq());
export const SyrupTypeNotFound: error = NotAcceptable.set("acceptedValues", syrupTypes.keySeq());
export const AlcoholypeNotFound: error = NotAcceptable.set("acceptedValues", alcoholTypes.keySeq());

export const ImATeapot: error = new APIError({
	statusCode: 418,
	message: "I'm a teapot"
});