'use strict';

const fs=require('fs');

fs.readdir(process.argv[2],'utf-8',(err,data)=>{
    if(err) return;

    let ext="."+process.argv[3];
    
    const files = data.toString().split(',');

  let res=  files.filter((file)=>{
        return file .trim().endsWith(ext);
    })

res.forEach((ele)=>{
    console.log(ele);

})


});