const express = require("express");
const app = express();
const db = require("./models");
const port = 4000;

const cors = require("cors");

const accountRouter = require("./routes/account");
const contentRouter = require("./routes/content");
const commentRouter = require("./routes/comment");
const serverRouter = require("./routes/server");
const pageRouter = require("./routes/page");
const nftRouter = require("./routes/nft");
const tokenRouter = require("./routes/token");
const authRouter = require("./routes/auth");
const mypageRouter = require("./routes/mypage");

app.use(cors());
app.use(express.json());
app.use("/account", accountRouter);
app.use("/content", contentRouter);
app.use("/comment", commentRouter);
app.use("/server", serverRouter);
app.use("/page", pageRouter);
app.use("/nft", nftRouter);
app.use("/token", tokenRouter);
app.use("/auth", authRouter);
app.use("/mypage", mypageRouter);

db.sequelize
  .sync({})
  .then(() => {
    console.log("dababase connected");
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
