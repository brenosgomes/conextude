const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const path = require('express-static');

app.use('/files', path(__dirname+'/tmp/uploads'))


app.db = db;

consign()
  .include("./config/middleware.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(5000, () => {
  console.log("Backend executando!");
});
