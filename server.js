const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//mounting routes
const routes = require("./routes/index");
//using body parser
app.use(express.json());
app.use(cors());

//setting PORT
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));

//Api Routes
app.use("/api/v1/records", routes);
//Server Run
const serverRun = app.listen(PORT, () => {
  console.log(`server running in on port ${PORT}`);
});
//handling unhandled promise rejection rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //closing the server & exit process
  //passing 1 mean we r closing it with some error
  serverRun.close(() => process.exit(1));
});
