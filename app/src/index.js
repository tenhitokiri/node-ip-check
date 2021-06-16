const express = require('express');
const morgan = require('morgan');
const requestIp = require('request-ip');
const cors = require('cors');

//activar modo desarrollo
const modo = process.env.MODO;
if (!modo) {
	const dotenv = require('dotenv').config();
	console.log('modo dev');
}

const app = express();
app.use(requestIp.mw())
app.use(cors())

//Configuración de la aplicación

//Middleware

//RUTAS
app.get('/', (req, res) => {
	const clientIp = req.clientIp
	const message = `La api esta en /API. tu ip es ${clientIp}`;
	res.json({
		message,
		clientIp
	});
});

//404 handle
app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});

module.exports = app;