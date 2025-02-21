'use strict';

const fs=require('fs');

fs.readFile(process.argv[2],'utf-8',(err,data)=>{

console.log(data.toString().split('\n').length-1);


});