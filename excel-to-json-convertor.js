const express = require("express");
const app = express();
const fileReader = require("read-excel-file/node");
var path = require("path");
const fs = require("fs");
//setting static path

app.use(express.static(path.join(__dirname, "data")));

// File path.
const jsonArray = [];
fileReader(path.join(__dirname) + "/data/webDesign.xlsx").then((rows) => {
  for (let i = 0; i < rows.length; i++) {
    jsonArray.push({
      "query-id": rows[i][0],
      Unique: rows[i][1],
      "accessibility-text": rows[i][2],
      "shot-title": rows[i][3],
      Url: rows[i][4],
      "display-name": rows[i][5],
      "shot-thumbnail-link-href": rows[i][6],
      "lazyautosizes-src": rows[i][7],
      "js-shot-comments-count": rows[i][8],
      "js-shot-likes-count": rows[i][9],
    });
    // console.log("new record", rows[i][0]);
  }
  const obj = {
    records: jsonArray,
  };
  let json = JSON.stringify(obj); //convert it back to json
  fs.writeFile("data.json", json, "utf8", () => {
    console.log("written Json File");
  }); // write it back
}); // File path.
