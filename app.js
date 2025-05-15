const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./models/user.model');


const app = express();
const port = 3000;

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/proyecto2bit',{
    useNewUrlParser: true,
    useUnifiedTopology: true

})

.then(() => {
    console.log("Conexion exitosa a mongo");
}).catch((error) => {
    console.log("Error al conectarnos a mongo: " + error);
});

app.post("/api/users", async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol } = req.body;

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña,
            rol,
        });

        await nuevoUsuario.save(); // Guardar en MongoDB

        res.status(201).json({ message: "Usuario creado correctamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el usuario", error });
    }
});


app.get('/api/users', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener un usuario', error });
    }
});




app.listen(port, () => {
    console.log("Servidor funcionando por el puerto " + port);
});


