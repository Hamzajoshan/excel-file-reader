var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/main", function (req, res, next) {
  fs.readFile("data.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      return res.json({
        status: 500,
        error: "There is An Error While Fetching Data",
      });
    } else {
      let obj = JSON.parse(data);
      let records = obj.records;
      let pushed = [];
      let count = 0;
      let results = [];
      while (count <= 50) {
        let x = Math.ceil(Math.random() * (records.length - 1));

        if (!pushed.includes(x)) {
          pushed.push(x);
          let record = records[x];
          results.push(record);
          count++;
        }
      }
      return res.json({
        status: 200,
        data: results,
      });
    }
  });
});

router.get("/all", function (req, res, next) {
  fs.readFile("data.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      return res.json({
        status: 500,
        error: "There is An Error While Fetching Data",
      });
    } else {
      let obj = JSON.parse(data);
      let records = obj.records;
      let results = [];

      for (let i = 0; i < records.length; i++) {
        var record = records[i].Url;
        if (record !== null) {
          results.push(record);
        }
      }

      return res.json({
        status: 200,
        data: results,
      });
    }
  });
});

router.get("/single-post", function (req, res, next) {
  const { id } = req.query;
  if (!id) {
    return res.json({
      status: 400,
      error: "No Id Provided",
    });
  }
  fs.readFile("data.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      return res.json({
        status: 500,
        error: "There is An Error While Fetching Data",
      });
    } else {
      let obj = JSON.parse(data);
      let records = obj.records;

      records.filter((record) => {
        if (record.Unique == id) {
          return res.json({
            status: 200,
            data: record,
          });
        }
      });
    }
  });
});

module.exports = router;
