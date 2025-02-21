// Problem 1:

// Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "randomFile");
let create = 15;

createDirectoryAndFiles((err) => {
  if (err) {
    console.log("Error creating files:", err);
  } else {
    console.log("Created files successfully!");

    deleteFiles((err) => {
      if (err) {
        console.log("Error deleting files:", err);
      } else {
        console.log("Deleted files and directory successfully!");
      }
    });
  }
});

function createDirectoryAndFiles(callbackError) {
  fs.mkdir(dir, (err) => {
    if (err) return callbackError(err);

    let filesCreated = 0;
    for (let i = 1; i <= create; i++) {
      let file = path.join(dir, `file-${i}.json`);
      let randomData = {
        name: file,
        value: i,
      };

      fs.writeFile(file, JSON.stringify(randomData, null, 2), (err) => {
        if (err) return callbackError(err);

        filesCreated++;
        console.log("file is created:",filesCreated);
        if (filesCreated === create) {
          callbackError(null);
        }
      });
    }
  });
}

function deleteFiles(callbackError) {
  fs.readdir(dir, (err, files) => {
    if (err) return callbackError(err);

    if (files.length === 0) {
      return callbackError("Directory is empty");
    }

    let filesDeleted = 0;
    files.forEach((file) => {
      fs.rm(path.join(dir, file), (err) => {
        if (err) return callbackError(err);
        filesDeleted++;
        console.log("file is deleted:",filesDeleted);

        if (filesDeleted === files.length) {
          fs.rmdir(dir, (err) => {
            if (err) return callbackError(err);
            callbackError(null);
          });
        }
      });
    });
  });
}


// module.exports={createFiles,deleteFiles};


