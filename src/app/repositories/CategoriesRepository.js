const { v4 } = require('uuid');
const db = require('../database');

const findAllSql = 'SELECT * FROM categories';
const findByIdSql = 'SELECT * FROM categories WHERE id = $1';
const deleteSql = 'DELETE FROM categories WHERE id = $1';
const createSql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
const updateSql = 'UPDATE categories SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *';

class CategoriesRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query(findAllSql)
        .then(({ rows }) => resolve(rows))
        .catch((err) => reject(err));
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.query(findByIdSql, [id])
        .then(({ rows }) => {
            resolve(rows[0]);
        })
        .catch((err) => reject(err));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query(deleteSql, [id])
        .then(({ rows }) => {
            resolve(rows[0]);
        })
        .catch((err) => reject(err));
    });
  }

  create({ name }) {
    return new Promise((resolve, reject) => {
      db.query(createSql, [name])
        .then(({ rows }) => resolve(rows[0]))
        .catch((err) => reject(err));
    });
  }

  update(id, { name }) {
    return new Promise((resolve, reject) => {
      db.query(updateSql, [name, id])
        .then(({ rows }) => {
            resolve(rows[0]);
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = new CategoriesRepository();
