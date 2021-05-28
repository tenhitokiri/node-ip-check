const express = require('express');
const morgan = require('morgan');

//activar modo desarrollo
const modo = process.env.MODO;
if (!modo) {
	const dotenv = require('dotenv').config();
	console.log('modo dev');
}

const app = express();

//Configuración de la aplicación

//Middleware
app.use(express.json());

//RUTAS
app.get('/', (req, res) => {
	const message = `La api esta en /API. `;
	res.json({
		message
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