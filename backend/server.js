const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { loginUser, registerUser } = require('./authService');

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
    try {
      const uid = await loginUser(email, password);
      res.status(200).json({ uid });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  });
  
  app.post('/api/register', async (req, res) => {
    const { email, password, username, phone, empresa, tipoEmpresa, tiempoInventario } = req.body;
    try {
      const result = await registerUser(email, password, username, phone, empresa, tipoEmpresa, tiempoInventario);
      if (result.success === 1) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud.', error });
    }
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://192.168.100.7:${port}`);
});
