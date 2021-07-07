'use strict';
const pool = require('./pool');

class Interface {
  
  read(id) {
    if (id) {
      return pool.query('SELECT * FROM games WHERE id=$1;', [id]);
    } else {
      return pool.query('SELECT * FROM games;');
    }
  }

  create(obj) {
    const sql = 'INSERT INTO games (name,rate,genre) VALUES ($1,$2,$3) RETURNING *;';
    const saveValues = [obj.name, obj.rate, obj.genre];
    return pool.query(sql, saveValues);
  }

  update(id, obj) {
    const sql = 'UPDATE games SET name=$1,rate=$2,genre=$3 WHERE id=$4 RETURNING *;';
    const saveValues = [obj.name, obj.rate, obj.genre, id];
    return pool.query(sql, saveValues);
  }

  delete(id) {
    return pool.query('DELETE FROM games WHERE id=$1 RETURNING *;', [id]);
  }
}

module.exports = Interface;

