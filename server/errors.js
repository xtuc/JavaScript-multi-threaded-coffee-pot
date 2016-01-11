/* @flow */
"use strict";

import Immutable from "immutable";
import APIError from "./models/APIErrorModel"
import {milkTypes, syrupTypes, alcoholTypes} from "./models/CoffeeOptionTypes"

export const ImATeapot: error = new APIError({ statusCode: 418, message: "I'm a teapot", name: "ImATeapot" });
export const Potbusy: error = new APIError({ statusCode: 510, message: "Pot busy", name: "Potbusy" });
export const AlreadyAdded: error = new APIError({ statusCode: 506, message: "Already Added", name: "AlreadyAdded" });
export const OverflowError: error = new APIError({ statusCode: 420, message: "Overflow error", name: "OverflowError" });
export const CoffeeGoneCold: error = new APIError({ statusCode: 419, message: "Coffee gone cold", name: "CoffeeGoneCold" });

export const NotAcceptable: object = new APIError({ statusCode: 406, message: "Not Acceptable", name: "NotAcceptable" });

export const TypeNotFound: error = NotAcceptable;
export const MilkTypeNotFound: error = NotAcceptable.set("acceptedValues", milkTypes.keySeq());
export const SyrupTypeNotFound: error = NotAcceptable.set("acceptedValues", syrupTypes.keySeq());
export const AlcoholypeNotFound: error = NotAcceptable.set("acceptedValues", alcoholTypes.keySeq());