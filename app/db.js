const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  database: 'testdb'
});

function createTableIfNotExists() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
        )
  `;

  connection.query(createTableQuery, (err, results, fields) => {
    if (err) {
      console.error('Erro ao criar a tabela: ' + err.stack);
      return;
    }
    console.log('Tabela `people` verificada/criada com sucesso');
  });
}

function insertPerson(name) {
    const insertQuery = 'INSERT INTO people (name) VALUES (?)';
  
    connection.query(insertQuery, [name], (err, results) => {
      if (err) {
        console.error('Erro ao inserir dados: ' + err.stack);
        return;
      }
      console.log('Dados inseridos com sucesso');
    });
};

async function selectPeople() {
  const selectQuery = 'SELECT * FROM people';

  try {
      const results = await new Promise((resolve, reject) => {
          connection.query(selectQuery, (err, results) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(results);
              }
          });
      });

      return results.map(result=>result.name);
  } catch (err) {
      throw new Error('Erro ao executar a consulta: ' + err.stack);
  }
}

connection.connect((err,) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL: ' + err.stack);
      process.exit(0)
      return;
    }
    console.log('Conectado ao MySQL');

    createTableIfNotExists()
  
  
});

module.exports = {
    selectPeople,
    insertPerson
}