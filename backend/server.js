const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { loginUser, registerUser, getUserData } = require('./authService');
const { spawn } = require('child_process');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.use(cors());  
app.use(bodyParser.json());

app.get('/download/template', (req, res) => {
  console.log('Descargando documento...');
  const tipoComercio = req.query.tipoComercio;   
  
  let fileName = 'plantillaProductos.xlsx'; 
  
  if (tipoComercio == 'comida') {      
      fileName = 'plantillaComida.xlsx'; 
  }
  
  const filePath = path.join(__dirname, '..', 'assets/documents', fileName); 
  res.download(filePath, fileName, (err) => {
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

  app.get('/api/user/:uid', async (req, res) => {
    const { uid } = req.params;
    const user = await getUserData(uid);
    res.status(200).json(user);
  });

  app.post('/convertExcel', upload.single('file'), (req, res) => {
    console.log('Archivo recibido:', req.file);
    console.log('tipo', req.body.tipo);
    const pythonProcess = spawn('python', ['C:\\Universidad\\sextoSemestre\\Proyectate\\github\\anyVent\\backend\\funExcel.py', req.file.path, 'Hoja1', req.body.tipo]);

    let jsonData = ''; // Variable para almacenar el JSON generado

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        jsonData += data.toString(); // Concatenar la salida del proceso
        console.log(jsonData);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        
        // Enviar el JSON como parte de la respuesta al cliente
        res.status(200).json({ success: true, data: jsonData });
    });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://192.168.100.7:${port}`);
});
