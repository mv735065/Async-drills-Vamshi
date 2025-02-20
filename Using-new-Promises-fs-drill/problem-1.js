// Problem 1:

// Using new promises, do the following:
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously

// Second, you need to learn about how to create promises.
// So do the same drill again but without using promises from fs library.
// You will need to construct your own promise based functions using the promise constructor.
// Create separate functions for read, write, append, delete etc and use them to solve the problems.
//  Do not do multiple async operatios in a single promise

const fs = require("fs");

const path = require("path");

let dirPath = path.join(__dirname, "Random-Files");

let creatFiles = 10;

createDirectory()
  .then((data) => {
    console.log(data);
    return createRandomFiles();
  })
  .then((data) => {
    console.log(data);
    return deleteFiles();
  })
  .then((data) => {
    console.log(data);
    return deleteDirectory();
  })
  .then((data) => {
    console.log(data);
  })

  .catch((err) => {
    console.log(err);
  });

function createDirectory() {
  return new Promise((res, rej) => {
    fs.mkdir(dirPath, (err) => {
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

function deleteFiles() {
  return readDirectory().then((files) => {
    return Promise.all(arrayOfPromiseDeletingPromises(files));
  });
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
function arrayOfPromiseDeletingPromises(files) {
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
