/* @flow */
"use strict";

import Threads from "webworker-threads"
import CoffeeRecord from "../Coffee/CoffeeRecord";
import Console from "better-console";
import util from "util";

const numCPUs = require('os').cpus().length;

export class CofeeThread {
	threadPool: Object;

	createPool(num) {
		Console.debug("CoffePot set to", numCPUs, "concurrent coffees");

		this.threadPool = Threads
							.createPool(num)
							.all
							.eval(this._doCoffee);

		/**
		 * Avoid process exit if threard are still running
		 */
		// process.on("SIGINT", () => {
		// 	console.log(util.format("%s thread are still making coffee", this.threadPool.pendingJobs()))
		// });

		return this;
	}

	/**
	 * Pure function directly executed with V8 engine
	 */
	_doCoffee(coffee) {
		var coffee = JSON.parse(coffee);

		var d = new Date(coffee.startedAt).getTime() + 10000; // 10000 = brew duration
		while(new Date().getTime() <= d ) {
			// Coffee is brewing ...
		}

		coffee.brewing = false;
		coffee.finishedAt = new Date();

		return JSON.stringify(coffee);
	}

	run(coffee: Object) {
		if(coffee.get("brewing")) return false; // Already brewing
		if(this.threadPool.idleThreads() === 0) return false; // No avaiblable threads

		coffee = coffee
					.set("brewing", true)
					.set("startedAt", new Date());

		this.threadPool.any.eval("_doCoffee('"+ JSON.stringify(coffee.toJS()) +"')", function(err, val) {
			if(err) Console.error(err);

			val = JSON.parse(val);

			console.log("Brewed coffee", new CoffeeRecord(val));
		});

		return true;
	}
}

export default new CofeeThread().createPool(numCPUs);