/* @flow */
"use strict";

import inquirer from "inquirer"
import Console from "better-console"
import request from "request"

// Temporary get options from server
import {milkTypes, syrupTypes, alcoholTypes} from "../server/Coffee/CoffeeOptionTypes";

const defaultPort = 8080;

const toArray = (obj) => obj.keySeq().toJS();
const getURLByHost = (host) => "http://" + host + ":" + defaultPort;

const questions = [
	{ type: "input", default:"localhost", name: "host", message: "Host ?" },
	{ type: "checkbox", name: "milk", message: "Select milk", choices: toArray(milkTypes) },
	{ type: "checkbox", name: "syrup", message: "Select syrup", choices: toArray(syrupTypes) },
	{ type: "checkbox", name: "alcohol", message: "Select alcohol", choices: toArray(alcoholTypes) },
	// { type: "comfirm", name: "comfirm", message: "Send request ?" },
];

inquirer.prompt(questions, function(answers) {

	const data: any = {
		"addition-type": "*"
	};

	if(answers.milk.length > 0) data["milk-type"] = answers.milk.join(",");
	if(answers.syrup.length > 0) data["syrup-type"] = answers.syrup.join(",");
	if(answers.alcohol.length > 0) data["alcohol-type"] = answers.alcohol.join(",");

	const options = {
		url: getURLByHost(answers.host),
		headers: data
	}

	request.post(options, function(err, httpResponse, body) {
		if(err) throw err;

		Console.log("Response", body);
	});
});