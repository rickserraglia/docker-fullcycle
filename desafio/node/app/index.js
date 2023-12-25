import express from 'express';
import mysql from 'mysql';
import { fakerPT_BR as faker } from '@faker-js/faker';

const app = express();
const port = 3000;
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};

app.get('/', async (_req, res) => {
	const connection = mysql.createConnection(config);

	const insert = `INSERT INTO people(name) values('${faker.person.fullName()}')`;
	connection.query(insert);

	const select = `SELECT name FROM people`;
	const names = await new Promise((resolve, reject) => {
		connection.query(select, (err, result) => {
			if (err) reject(err);

			resolve(result.map((row) => `<li>${row.name}</li>`));
		});
	});

	connection.end();

	res.send(`<h1>Full Cycle!</h1><ul>${names.join('')}</ul>`);
});

app.listen(port, () => {
	console.log(`Rodando na porta ${port}`);
});
