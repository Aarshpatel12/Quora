const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const {v4: uuidv4} = require('uuid'); // ✅ correct usage


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: uuidv4(), title: "Post 1", content: "This is the first post." },
  { id: uuidv4(), title: "Post 2", content: "This is the second post." },
  { id: uuidv4(), title: "Post 3", content: "This is the third post." },
  { id: uuidv4(), title: "Post 4", content: "This is the fourth post." },
];
   
app.get("/posts/:id", (req, res) => { 
  const { id } = req.params;
  const post = posts.find((p) => id === p.id);
  console.log(id);
  console.log(post);
  res.render("show",{ post });
});

app.get("/posts", (req, res) => {
  res.render("index.ejs" , { posts: posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  let {title,content} = req.body;
  let id = uuidv4();
  posts.push({id,title,content});
  res.redirect("/posts");
});
   
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

