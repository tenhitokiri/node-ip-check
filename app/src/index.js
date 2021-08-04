const express = require('express');
const morgan = require('morgan');
const requestIp = require('request-ip');
const cors = require('cors');
const fizzBuzz = require('./Functions')

//activar modo desarrollo
const modo = process.env.MODO;
if (!modo) {
	const dotenv = require('dotenv').config();
	console.log('modo dev');
}

//Middleware
const app = express();
app.use(requestIp.mw())
app.use(cors())

//RUTAS
app.get('/', (req, res) => {
	const clientIp = req.clientIp
	const message = `La api esta en /API. tu ip es ${clientIp}`;
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

//404 handle
app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});

module.exports = app;