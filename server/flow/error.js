/* @flow */

type error = {
	name: string;
	message: string;
	statusCode: Number;
	details: string;
};

type Option = any | null;