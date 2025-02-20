// Problem 1:

// Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously

// Next, you can start learning about promises and do the following as practice

// - Firstly, for promises,  learn how to consume readymade promises. 
// So do the same callback drill using promises from `fs` library.```js
// 
// ```

// async function importFs() {
// const { default: fs } =await import("fs/promises");
// return fs;
    
// }

const fs = require('fs/promises');

const path=require('path');

let dirPath=path.join(__dirname,"randomDirFiles");


let createFiles=10;

createDirectory().then(()=>{
    console.log("Successfully created Directory");

   return  createFilesInDir();
})
.catch((err)=>{
    console.log("Error on creating Directory:",err);
  
})
.then(()=>{
    console.log("Files Created");
   return deleteFiles();
})



.catch((err)=>{
    console.log("unable to create files:",err);
})



 function createDirectory(){
    return fs.mkdir(dirPath);
}

function createFilesInDir(){
   
    let count=0;
    return new Promise((resolve, reject) => {
    for(let i=1;i<=createFiles;i++){
        let filePath=path.join(dirPath,`file-${i}.json`);
        let randomData={
            name:filePath,
            data:i,
        }
        fs.writeFile(filePath,JSON.stringify(randomData),'utf-8').then(()=>{
           count++;
           console.log("file-created",count);
           
           if(count===createFiles){
           resolve();
           }
        })
        .catch((err)=>{
            reject(`Error on creating file-${i} : ${err}`);
        })
    }
});
}

function deleteFiles(){

     fs.readdir(dirPath,'utf-8').then((data)=>{
        let files = data
        .map((file) => file.trim())
        .filter(Boolean);
        let count=0;
        files.forEach((file)=>{
            let filePath=path.join(dirPath,file);
            fs.unlink(filePath).then(()=>{
                console.log("file deleted",file);
                count++;
                if(count===createFiles){
                    console.log("Successfuly deleted all files")
                    fs.rmdir(dirPath).then(()=>{
                        console.log("Directory deleted");
                       
                    });
                }
            })
            .catch(err=>console.log("errror in deleting a file"));
        })
        
    })
    .catch((err)=>{
        console.log("unable to read Directory:",err);
    })

}










