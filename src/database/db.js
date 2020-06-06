const sqlite3 = require("sqlite3").verbose();

// build database object
const db = new sqlite3.Database("./src/database/database.db");

// using database object
db.serialize(() => {
  // create table
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     image TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `)

  // // insert data in table
  // const query = `INSERT INTO places (
  //     name,
  //     image,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES ( ?,?,?,?,?,?,?)`;
  // const values = [
  //   "Papersider",
  //   "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  //   "Guilherme Gemballa, Jardim América",
  //   "Número 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "1,2"
  // ];

  // function afterInsertData(error) {
  //   if (error) {
  //     console.log(error)
  //   }
  //   console.log("Cadastrado com sucesso");
  //   console.log(this);
  // }
  // db.run(query, values, afterInsertData)

  // get all from table
  // db.all(`SELECT * FROM places`, function (error, rows) {
  //   if (error) {
  //     console.log(error)
  //   }
  //   console.log("Registros");
  //   console.log(rows)
  // })

  // delete 
  // db.run(`DELETE FROM places WHERE id= ?`, [2], function (error) {
  //   if (error) {
  //     console.log(error)
  //   }
  //   console.log('Registro deletado com sucesso')
  // })



});

module.exports = db;
