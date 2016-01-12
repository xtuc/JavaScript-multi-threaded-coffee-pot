import Immutable from "immutable";

/* @flow */
"use strict";

export const milkTypes = new Immutable.Map([
	["Cream", 0x01],
	["Half-and-half", 0x02],
	["Whole-milk", 0x04],
	["Part-Skim", 0x08],
	["Skim", 0x16],
	["Non-Dairy", 0x32]
]);

export const syrupTypes = new Immutable.Map([
	["Vanilla", 0x01],
	["Almond", 0x02],
	["Raspberry", 0x04],
	["Chocolate", 0x08],
]);

export const alcoholTypes = new Immutable.Map([
	["Whisky", 0x01],
	["Rum", 0x02],
	["Kahlua", 0x04],
	["Aquavit", 0x08],
]);