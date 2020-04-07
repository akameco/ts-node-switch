#!/usr/bin/env node
"use strict";
const meow = require("meow");
const execa = require("execa");

const cli = meow(
  `
	Usage
	  $ node [input]

	Examples
	  $ ts-node-switch index.js
	  node ...
	  $ ts-node-switch index.ts
    ts-node ...
`,
  { help: false }
);

(async () => {
  const isTs = cli.input.some((value) => /.ts$/.test(value));
  const node = isTs ? "ts-node" : "node";
  try {
    const { stdout } = await execa(node, process.argv.slice(2));
    console.log(stdout);
  } catch (error) {
    console.log(error.message);
  }
})();
