#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const clear_1 = tslib_1.__importDefault(require("clear"));
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const commander_1 = tslib_1.__importDefault(require("commander"));
clear_1.default();
console.log(chalk_1.default.red(figlet_1.default.textSync("pizza-cli", { horizontalLayout: "full" })));
commander_1.default
    .version("0.0.1")
    .description("An example CLI for ordering pizza's")
    .option("-p, --peppers", "Add peppers")
    .option("-P, --pineapple", "Add pineapple")
    .option("-b, --bbq", "Add bbq sauce")
    .option("-c, --cheese <type>", "Add the specified type of cheese [marble]")
    .option("-C, --no-cheese", "You do not want any cheese")
    .parse(process.argv);
console.log("you ordered a pizza with:");
if (commander_1.default.peppers)
    console.log("  - peppers");
if (commander_1.default.pineapple)
    console.log("  - pineapple");
if (commander_1.default.bbq)
    console.log("  - bbq");
const cheese = true === commander_1.default.cheese ? "marble" : commander_1.default.cheese || "no";
console.log("  - %s cheese", cheese);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
