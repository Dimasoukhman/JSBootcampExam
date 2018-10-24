/**
   NAME : DIMA SOUKHMAN
   ID   : 317639615
**/
var pathCurrent    = __dirname;
var resultsCounter = 0;
var fs             = require('fs');

//check if argument not passed, print running structure usage
if (process.argv.length <= 3) {
    console.log("Usage: node search [EXT] [TEXT]");
    process.exit(-1);
}
var ext           = process.argv[2].toLowerCase();
var text_search   = process.argv[3];

/***************************************************
 searching rellevant files with recursion in all subdirs.
 the files with [EXT] and conatining [TEXT] will be printed
 if no file was found and printed it prints proper message
/***************************************************/
function fromDir(path){
  if (!fs.existsSync(path)){
      console.log("no dir ",path);
      return;
  }
  //Read list of files into array (folders and files)
  var files=fs.readdirSync(path);
  for(var i=0;i<files.length;i++){
      var fname=path.concat("\\" + files[i]);
      var stat = fs.lstatSync(fname);
      /*if directory:
         execute recursively from this dir this function to load files
      */
      if (stat.isDirectory()){
          fromDir(fname);
      }
      else{
        /*if file:
          checking [ext] and on matching if file contains the [text] arg
          print file path on passing two checkings
        */
        extThisFile = fname.substr(fname.length - ext.length,ext.length).toLowerCase();
        if (extThisFile === ext){
            var data = fs.readFileSync(fname).toString();
            if(data.includes(text_search)){
              resultsCounter++;
              console.log(fname);
            }
        }
      }
  }
}
fromDir(pathCurrent);
//if no file is founded with our criteria 
if (resultsCounter==0){
  console.log("No file was found");
}
