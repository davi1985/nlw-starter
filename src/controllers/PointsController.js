const db = require('../database/db');

module.exports = {
  async index(req, res) {
    const search = req.query.search;

    if (search == '') {
      return res.render('search-results.html', { total: 0 });
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
      error,
      rows
    ) {
      if (error) {
        console.log(error);
      }
      const total = rows.length;
      // render html page with data
      return res.render('search-results.html', { places: rows, total });
    });
  },

  async store(req, res) {
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
        console.log(error);
        return res.render('create-point.html', { saved: false });
      }
      return res.render('create-point.html', { saved: true });
    }

    db.run(query, values, afterInsertData);
  },
};
