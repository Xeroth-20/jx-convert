#!/usr/bin/env node
const cli = require('./jx-convert.js');

const cliHelp = `Syntax: jx-convert <from> <number> <to>

Where <from> & <to> are numeral systems as follow:
    dec,
    hex,
    bin
`;

const [nodePath, filePath, from, num, to] = process.argv;
const result = cli(from, num, to); 

if (result == null) console.log(cliHelp);
else console.log(result);