/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");
const path = require("path");
let dirPath = path.resolve();
dirPath = path.join(dirPath, "Data-texts");

let storeFilesNames = path.join(dirPath, "filenames.txt");

readTheFile("lipsum.txt", (err, data) => {
  if (err) {
    console.error("Error in reading file lipsum:", err);
  } else {
    console.log("Successfully read the lipsum file");

    convertUpperCase(data, (err) => {
      if (err) {
        console.error("error converting text to Uppsercase:", err);
      } else {
        console.log("Converted the text to Upppsercase");

        readTheFile("uppserCaseDataFile.txt", (err, upperCaseData) => {
          if (err) {
            console.error("Error in reading file upperFile:", err);
          } else {
            console.log("Successfully read the Upperfile");

            covertDataToLowerCaseAndSplit(upperCaseData, (err) => {
              if (err) {
                console.error("error converting text to Lowercase:", err);
              } else {
                console.log("Converted the text to Lowercase and splitted");

                readTheFile("lowerCaseDataFile.txt", (err, lowerCaseData) => {
                  if (err) {
                    console.error("Error in reading file lowerFile:", err);
                  } else {
                    console.log("Successfully read the lowerCaseFile");

                    sortTheData(lowerCaseData, (err) => {
                      if (err) {
                        console.error("error in spllited data:", err);
                      } else {
                        console.log(
                          "Succesfully data is sorted and created sorted file"
                        );

                        deleteFilesInList((err) => {
                          if (err)
                            console.error("error in files not deleted :", err);
                          else {
                            console.log("Files Successfully deleted");
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

function readTheFile(name, callback) {
  let filePath = path.join(dirPath, name);
  fs.readFile(filePath, "utf-8", callback);
}

function convertUpperCase(data, callback) {
  let newFile = path.join(dirPath, "uppserCaseDataFile.txt");
  let res = data.toUpperCase();
  fs.writeFile(newFile, res, "utf-8", (err) => {
    if (err) {
      return callback(err);
    } else {
      fs.appendFile(storeFilesNames, "uppserCaseDataFile.txt\n", (err) => {
        if (err) console.log("Unable to add file to filenames: ", err);
        else callback(null);
      });
    }
  });
}

function covertDataToLowerCaseAndSplit(upperData, callback) {
  let newFile = path.join(dirPath, "/lowerCaseDataFile.txt");
  let res = upperData.toLowerCase();
  let splited = res.split(".").join("\n");

  fs.writeFile(newFile, splited, "utf-8", (err) => {
    if (err) {
      return callback(err);
    } else {
      fs.appendFile(storeFilesNames, "lowerCaseDataFile.txt\n", (err) => {
        if (err) console.log("Unable to add file to filenames: ", err);
        else callback(null);
      });
    }
  });
}

function sortTheData(data, callback) {
  let newFile = path.join(dirPath, "sortedDataFile.txt");
  let res = data.toLowerCase();
  let sorted = res.split("\n").sort().join("\n");

  fs.writeFile(newFile, sorted, "utf-8", (err) => {
    if (err) {
      return callback(err);
    } else {
      fs.appendFile(storeFilesNames, "sortedDataFile.txt\n", (err) => {
        if (err) console.log("Unable to add file to filenames: ", err);
        else callback(null);
      });
    }
  });
}

function deleteFilesInList(callback) {
  let fileName = storeFilesNames;

  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) return callback(err);
    let files = data
      .split("\n")
      .map((file) => file.trim())
      .filter(Boolean);
    console.log(files);

    if (files.length === 0) {
      return callback("No files to delete");
    }
    let deletedCount = 0;

    files.forEach((file, index) => {
      let name = file;
      fs.rm(path.join(dirPath, `${file}`), { force: true }, (err) => {
        if (err) return callback(err);
        deletedCount++;

        if (deletedCount === files.length) {
          fs.writeFile(storeFilesNames, "", (err) => {
            if (err) return callback(err);
            else callback(null);
          });
        }
      });
    });
  });
}
