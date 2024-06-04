// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { loginUser } = require('./authService');

const app = express();
const port = 3000;

app.use(cors());  // Esto permite todas las solicitudes CORS
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email, 'Password:', password)
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Credenciales incorrectas', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://192.168.100.7:${port}`);
});
