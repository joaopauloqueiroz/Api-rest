const neo4j = require('neo4j-driver').v1;
//criar a conexao com o baanco

const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '200*tecnology'));
const session = driver.session();

module.exports = {driver, session}