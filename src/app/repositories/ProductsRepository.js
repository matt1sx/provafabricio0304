const { v4 } = require('uuid');
const db = require('../database');
const findAllSql = 'SELECT * FROM products';
const findByIdSql = 'SELECT * FROM products WHERE id = $1';
const deleteSql = 'DELETE FROM products WHERE id = $1';
const createSql = 'INSERT INTO products (name, price, category_id, subcategory) VALUES ($1, $2, $3, $4) RETURNING *';




class ProductsRepository {
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

  create({ name, price, category_id, subcategory, }) {
    return new Promise((resolve, reject) => {
      db.query(createSql, [name, price, category_id, subcategory])
        .then(({ rows }) => resolve(rows[0]))
        .catch((err) => reject(err));
    });
  }

  update(id, { name, price, category_id, subcategory, }) {
    const updates = {
      name,
      price,
      category_id,
      subcategory,
    };
    
    let query = 'UPDATE products SET ';
    let values = [id];
    
    Object.entries(updates).forEach(([key, value], index) => {
      if (value !== undefined) {
        query += `${key} = $${index + 2}, `;
        values.push(value);
      }
    });
    query += 'updated_at = NOW(), ';
    query = query.slice(0, -2); // Remove a vírgula extra no final
    query += ' WHERE id = $1 RETURNING *';
    
    return new Promise((resolve, reject) => {
        db.query(query, values)
          .then(({ rows }) => {
              resolve(rows[0]);
          })
        .catch((err) => reject(err));
    
    });
  
  }
}

module.exports = new ProductsRepository();
