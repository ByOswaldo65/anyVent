const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { loginUser } = require('./authService');

const app = express();
const port = 3000;

app.use(cors());  
app.use(bodyParser.json());

app.get('/download/template', (req, res) => {
    console.log('Descargando documento...');
    const filePath = path.join(__dirname, '..', 'assets/documents', 'plantillaProductos.xlsx'); // Ruta del archivo
    res.download(filePath, 'plantillaProductos.xlsx', (err) => {
      if (err) {
        console.log('Error al descargar el archivo:', err);
        res.status(500).send('Error al descargar el archivo.');
      }
    });
  });

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
