import Immutable from "immutable";

/* @flow */
"use strict";

export const milkTypes = new Immutable.Map([
	["Cream", 0x1],
	["Half-and-half", 0x2],
	["Whole-milk", 0x4],
	["Part-Skim", 0x8],
	["Skim", 0x16],
	["Non-Dairy", 0x32]
]);

export const syrupTypes = new Immutable.Map([
	["Vanilla", 0x1],
	["Almond", 0x2],
	["Raspberry", 0x4],
	["Chocolate", 0x8],
]);

export const alcoholTypes = new Immutable.Map([
	["Whisky", 0x1],
	["Rum", 0x2],
	["Kahlua", 0x4],
	["Aquavit", 0x8],
]);