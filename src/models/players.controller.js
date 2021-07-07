'use strict';
const pool = require('./pool');

class Interface {
  
  read(id) {
    if (id) {
      return pool.query('SELECT * FROM players WHERE id=$1;', [id]);
    } else {
      return pool.query('SELECT * FROM players;');
    }
  }

  create(obj) {
    const sql = 'INSERT INTO players (name,games) VALUES ($1,$2) RETURNING *;';
    const saveValues = [obj.name, obj.games];
    return pool.query(sql, saveValues);
  }

  update(id, obj) {
    const sql = 'UPDATE players SET name=$1,games=$2 WHERE id=$3 RETURNING *;';
    const saveValues = [obj.name, obj.games, id];
    return pool.query(sql, saveValues);
  }

  delete(id) {
    return pool.query('DELETE FROM players WHERE id=$1 RETURNING *;', [id]);
  }
}

module.exports = Interface;

