const express = require("express");
const app = express();
const db = require("./models");
const port = 4000;

const accountRouter = require("./routes/account");
const pageRouter = require("./routes/page");

app.use(express.json());
app.use("/account", accountRouter);
app.use("/page", pageRouter);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("dababase connected");
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
