    'use strict'

const fs=require('fs');

let data=fs.readFileSync(process.argv[2], 'utf-8');

console.log(data.toString().split('\n').length-1);
