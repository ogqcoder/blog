const express = require("express"); //server
const mongoose = require("mongoose"); //database
const Article = require("./models/article");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // createIndexes: true,
}); //creation of database

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
});
app.use("/articles", articleRouter);
app.listen(3000, function () {
  console.log("Started");
});
