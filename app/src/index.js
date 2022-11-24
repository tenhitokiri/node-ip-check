const express = require('express');
const morgan = require('morgan');
const requestIp = require('request-ip');
const cors = require('cors');
const fizzBuzz = require('./Functions')
const axios = require('axios')

//activar modo desarrollo
const modo = process.env.MODO;
if (!modo) {
	const dotenv = require('dotenv').config();
	console.log('modo dev');
}

//Middleware
const app = express();
app.use(requestIp.mw())
app.use(cors({ origin: '*' }))
app.use(morgan('tiny'))

//RUTAS
app.get('/', (req, res) => {
	const clientIp = req.clientIp
	const message = `Tu ip es ${clientIp}`;
	res.json({
		message,
		clientIp
	});
});

//fizzBuzz
app.get('/fizzbuzz/:n', (req, res) => {
	const n = req.params.n;
	const message = fizzBuzz(n);
	res.json({
		message,
		n
	});
})

app.get('/other/', async (req, res) => {
	const url = process.env.REMOTE || 'http://localhost:3000/users'
	console.log(`fetching: ${url}`);

	const { data } = await axios.get(url)
	if (!data) throw new Error('No data found')

	res.send(data)
})

//404 handle
app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});

module.exports = app;