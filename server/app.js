const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const accountRouter = require("./routes/account");
const contentRouter = require("./routes/content");
const commentRouter = require("./routes/comment");
const serverRouter = require("./routes/server");
const pageRouter = require("./routes/page");
const nftRouter = require("./routes/nft");
const authRouter = require("./routes/auth");
const mypageRouter = require("./routes/mypage");
const homeRouter = require("./routes/home");

dotenv.config();
const { sequelize } = require("./models");

const app = express();
app.set("port", process.env.PORT || 4000);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("dababase connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/account", accountRouter);
app.use("/content", contentRouter);
app.use("/comment", commentRouter);
app.use("/server", serverRouter);
app.use("/page", pageRouter);
app.use("/nft", nftRouter);
app.use("/auth", authRouter);
app.use("/mypage", mypageRouter);
app.use("/home", homeRouter);

app.listen(app.get("port"), () => {
  console.log("server is listening at port", app.get("port"));
});
