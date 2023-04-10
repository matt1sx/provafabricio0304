const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');

const connectionString = 'postgres://jmkmvyxt:y3Wt6bgb1SC1h20z3M18YC4do_25FoQf@babar.db.elephantsql.com/jmkmvyxt';

const db = new Pool({connectionString});

async function initDatabase() {
  try {
    const data = await fs.promises.readFile(path.join(__dirname, 'index.sql'), 'utf8');
    await db.query(data);
    console.log('Consulta executada com sucesso!');
  } catch (err) {
    console.error('Erro ao executar consulta:', err);
  }
}

initDatabase();

module.exports = db;
