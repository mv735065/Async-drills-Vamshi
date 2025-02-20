/*
    Problem 2:
    
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");

const path = require("path");

let dirPath = path.join(__dirname, "Data-texts");

let fileNamePath = path.join(dirPath, "filenames.txt");

readTheFile()
  .then((data) => {
    console.log("Sucessfully read the lipsum file");
    return convertToUppercase(data);
  })
  .then((data) => {
    console.log("Successfully creatd the uppercase file");

    return addFileToFileName("upperCaseData.txt\n").then(() => data);
  })
  .then((data) => {
    return convertDataToLowerAndSplit(data);
  })
  .then((data) => {
    console.log("Successfully creatd the lowercase file");
    return addFileToFileName("lowerCaseData.txt\n").then(() => data);
  })
  .then((data) => {
    return sortThedata(data);
  })
  .then((data) => {
    console.log("Successfully creatd sortedData the file");
    return addFileToFileName("sortedData.txt\n").then(() => data);
  })
  .then(() => {
    return deleteTheFileInFileNameFile();
  })
  .then(() => {
    console.log("Successfully deleted all files");
    clearOutTheNamesInFilenametxt();
  })
  .catch((err) => {
    console.log(err);
  });

function readTheFile() {
  let filePath = path.join(dirPath, "lipsum.txt");
  return new Promise((res, rej) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) rej(err);
      else {
        res(data);
      }
    });
  });
}

function convertToUppercase(data) {
  let upperData = data.toUpperCase();
  let newfile = path.join(dirPath, "upperCaseData.txt");
  return new Promise((res, rej) => {
    fs.writeFile(newfile, upperData, "utf-8", (err) => {
      if (err) rej(err);
      else {
        res(upperData);
      }
    });
  });
}

function convertDataToLowerAndSplit(data) {
  let lowerCasedata = data.toLowerCase();
  let splittedData = lowerCasedata.split(".").join("\n");
  let newfile = path.join(dirPath, "lowerCaseData.txt");

  return new Promise((res, rej) => {
    fs.writeFile(newfile, splittedData, "utf-8", (err) => {
      if (err) rej(err);
      else {
        res(splittedData);
      }
    });
  });
}

function sortThedata(data) {
  let sortedData = data.split("\n").sort().join("\n");
  let newfile = path.join(dirPath, "sortedData.txt");

  return new Promise((res, rej) => {
    fs.writeFile(newfile, sortedData, "utf-8", (err) => {
      if (err) rej(err);
      else {
        res(sortedData);
      }
    });
  });
}

function deleteTheFileInFileNameFile() {
  let readFile = new Promise((res, rej) => {
    fs.readFile(fileNamePath, "utf-8", (err, data) => {
      if (err) rej(err);
      else {
        let files = data.split("\n");
        files.pop();
        res(files);
      }
    });
  });

  return readFile.then((files) => {
    return Promise.all(
      files.map((file) => {
        let filepath = path.join(dirPath, file);
        return new Promise((res, rej) => {
          fs.unlink(filepath, (err) => {
            if (err) rej(err);
            else res("deleted");
          });
        });
      })
    );
  });
}

function clearOutTheNamesInFilenametxt() {
  return new Promise((res, rej) => {
    fs.writeFile(fileNamePath, "", (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

function addFileToFileName(filename) {
  return new Promise((res, rej) => {
    fs.appendFile(fileNamePath, filename, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}
