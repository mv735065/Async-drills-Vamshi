
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously


const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "randomFile");
let creatFiles = 15;
main();

async  function main(){
    try{
        let directory=await createDirectory();
        console.log(directory);
        let files=await createRandomFiles();
        console.log(files);
         let deletefiles=await deleteFiles();
        console.log(deletefiles);
        let deleteDir=await deleteDirectory();
        console.log(deleteDir);
        
    }
    catch(err){
      console.log(err);
      
    }
   
    
}


function createDirectory() {
  return new Promise((res, rej) => {
    fs.mkdir(dirPath,{recursive:true}, (err) => {
      if (err) {
        rej(err);
      } else {
        res("Successfully created directory");
      }
    });
  });
}

function createRandomFiles() {
    return Promise.all(arrayOfPromiseCreatingFiles());
  } 


 async function deleteFiles() {
    let files=await readDirectory();
      return Promise.all(arrayOfPromiseDeletingFiles(files));
    
  }

  function deleteDirectory() {
    return new Promise((res, rej) => {
      fs.rmdir(dirPath, (err) => {
        if (err) rej(err);
        else res("Successfully deleted Directory");
      });
    });
  }

  function arrayOfPromiseCreatingFiles() {
    let i = 0;
    let res = [];
    for (i = 1; i <= creatFiles; i++) {
      res.push(
        new Promise((res, rej) => {
          let c = i;
          let filePath = path.join(dirPath, `file-${i}.json`);
          fs.writeFile(filePath, "", "utf-8", (err) => {
            if (err) rej(err);
            else {
              res(`created file-${c}.json`);
            }
          });
        })
      );
    }
    return res;
  }


  function arrayOfPromiseDeletingFiles(files) {
    let res = [];
    files.forEach((file) => {
      res.push(
        new Promise((res, rej) => {
          let filePath = path.join(dirPath, file);
          fs.unlink(filePath, (err) => {
            if (err) rej(err);
            else {
              res(`deleted ${file}`);
            }
          });
        })
      );
    });
  
    return res;
  }
  
  function readDirectory() {
    return new Promise((res, rej) => {
      fs.readdir(dirPath, (err, data) => res(data));
    });
  }

