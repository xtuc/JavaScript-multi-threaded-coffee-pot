import inquirer from "inquirer"
import CoffeePotRecord from "./models/CoffeePot";

var coffeePot;

const questions = [
	{ type: "input", name: "concurrentCoffees", message: "How many concurrent coffees ?" },
	{ type: "confirm", name: "serveAlcohol", message: "Serve alcohol ?" }
];

inquirer.prompt(questions, function(answers) {
	coffeePot = new CoffeePotRecord(answers);

	console.log(coffeePot);
});