const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: String,
    correo: String,
    contraseña: String,
    rol: String

});

module.exports = mongoose.model('Usuario', userSchema); 