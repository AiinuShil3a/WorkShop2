const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const mongoose = require("mongoose");
const user = require("./models/user");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs")
const Post = require("./models/post")
const cookiePaser = require("cookie-parser")

require("dotenv").config();

const app = express();
const MONGODB = process.env.MONGODB_URL;
const PORTURL = process.env.PORT;
const SECRET = process.env.SECRET;

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors({credentials:true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(cookiePaser());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = user.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await user.findOne({ username });

    if (userDoc) {
      const isMatchPassword = bcrypt.compareSync(password, userDoc.password);

      if (isMatchPassword) {
        jwt.sign({ username, id: userDoc.id }, SECRET, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: userDoc.id,
            username,
          });
        });
      } else {
        res.status(400).json("Error Something!!");
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
})

app.post("/post",uploadMiddleware.single("file") , async (req,res) => {
  const {originalname , path} = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length -1];
  const newPath = path + "." + ext;
  fs.renameSync(path,newPath)
  const {token} = req.cookies;
  jwt.verify(token, SECRET, async (err, info) => {
    if(err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id
    })
    res.status(201).json(postDoc);

  })
})

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
    .populate("author", ["username"])
    .sort({createdAt: -1})
    .limit(20)
    res.json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error.message);
    res.status(500).json("Internal Server Error");
  }
});

app.use("/uploads" , express.static(__dirname + "/uploads"))
 
app.listen(PORTURL, () => {
  console.log("Server is running on http://localhost:" + PORTURL);
});
