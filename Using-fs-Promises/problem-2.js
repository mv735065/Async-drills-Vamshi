/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs/promises");

const path = require("path");

let dirPath = path.join(__dirname, "Data-texts");

let fileNameList = path.join(dirPath, "filenames.txt");

readFile()
  .then((data) => {
    console.log("Sucessfull read data");
    return convertDataToUppercase(data);
  })
  .then((upperData)=>{
    console.log("Sucessfull converted to Uppercase data and created file to it");
    return  addThefileNameToListFile("UpperCaseFileData.txt\n").then(() =>{
        return upperData;});
  })
  .then((upperdata)=>{
    
    console.log("Sucessfull Uppercase file added to list ");
     return convertUpperToLowerCaseAndSplit(upperdata);
  })
  .then((lowerdata)=>{
    console.log("Succesfully created lowercase file data and split into sentences");
    return  addThefileNameToListFile("LowerCaseData.txt\n").then(() => lowerdata);
  })
  .then((lowerData)=>{
    console.log("Sucessfull Lowercase file added to list ");
    return sortTheData(lowerData);
  })
  .then((sortedData)=>{
    console.log("Succesfully sorted the data and file is created ");
    return  addThefileNameToListFile("SortedDataFile.txt\n").then(() => sortedData);
  })
  .then(()=>{
    console.log("Sucessfull sorted file added to list ");
    return deleteFilesInFilelist();
  })
  .then(()=>{
  console.log("Successfully deleted all files & cleared the list");
  
  })

 
  .catch((err)=>{
      console.log("Caught error: ",err);
  })

function readFile() {
  let filePath = path.join(dirPath, "lipsum.txt");
  return fs.readFile(filePath, "utf-8");
}

function convertDataToUppercase(data) {
  let transformData = data.toUpperCase();
  let fileName = "UpperCaseFileData.txt";
  let newFile = path.join(dirPath, fileName);
  return fs.writeFile(newFile, transformData, "utf-8").then(()=>transformData);
}

function addThefileNameToListFile(name) {
  return fs.appendFile(fileNameList, name, "utf-8");
}

function convertUpperToLowerCaseAndSplit(data){
    let lowerData=data.toLowerCase();
    let splitData=lowerData.split(".").join("\n");
    let newFile=path.join(dirPath,'LowerCaseData.txt');
    return fs.writeFile(newFile,splitData,"utf-8").then(()=>lowerData);
}

function sortTheData(data){
    let sorted=data.split('\n').sort().join('\n');
    let newFile=path.join(dirPath,'SortedDataFile.txt');
    return fs.writeFile(newFile,sorted,"utf-8").then(()=>sorted);
}

function deleteFilesInFilelist(){
    fs.readFile(fileNameList,'utf-8').then((data)=>{
        let files=data.split('\n');
        files.pop();
        let length=files.length;
        let count=0;
        files.forEach((file)=>{
            let filePath=path.join(dirPath,file);
            fs.unlink(filePath).then(()=>{
                console.log("File deleted",file);
                count++;
                if(count===length){
                   return  fs.writeFile(fileNameList,'','utf-8');
                }
            })
            .catch((err)=>{
                console.log("Error in deleting file",err);
            })
        });
       
    })
    .catch((err)=>{
        console.log("Error in reading file names",err);
    })
}
