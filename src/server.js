const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const db = require('./database/db')

// setting express
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));


// nunjucks settings
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// routes
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  const query = `INSERT INTO places (
        name,
        image,
        address,
        address2,
        state,
        city,
        items
      ) VALUES ( ?,?,?,?,?,?,?)`;
  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(error) {
    if (error) {
      console.log(error)
      return res.render("create-point.html", { saved: false });
    }
    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
  const search = req.query.search

  if (search == "") {
    return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (error, rows) {
    if (error) {
      console.log(error)
    }
    const total = rows.length
    // render html page with data
    return res.render("search-results.html", { places: rows, total });
  })
});

// start server in port 3000
server.listen(3000);
