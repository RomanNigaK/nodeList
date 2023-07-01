const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;
const http = require("http");
const app = express();

var hederServer = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", " true");
  res.header(
    "Access-Control-Allow-Headers",
    " Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type"
  );
  next();
};
app.use(hederServer);

const httpServer = http.createServer(app);

app.use(express.json({ extended: true }));
//app.use("/image", express.static(path.join(__dirname, "image")));

app.use("/api/test", require("./routes/test.router"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

async function start() {
  if (process.env.NODE_ENV === "production") {
    httpServer.listen(80, () => console.log(`Server start ${80}`));
  } else {
    http
      .createServer(app)
      .listen(PORT, () => console.log(`Server start ${PORT}`));
  }
}
start();
app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});
