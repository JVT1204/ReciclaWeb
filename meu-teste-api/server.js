const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const sharp = require('sharp');

const app = express();
const PORT = 3001; // Porta separada só para o seu teste

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const name = `${Date.now()}-${Math.random()}-${base}${ext}`;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if(!file.mimetype.startsWith('image/')) 
      return cb(new Error('Apenas imagens'));
    cb(null, true);
  }
});

app.post('/api/images', upload.array('images', 10), async (req, res) => {
  try {
    const host = 'http://localhost:' + PORT;
    const images = [];

    for (const f of req.files) {
      const thumbName = 'thumb_' + f.filename;
      await sharp(f.path).resize({ width: 300 }).toFile(path.join(UPLOADS_DIR, thumbName));

      images.push({
        filename: f.filename,
        url: host + '/uploads/' + f.filename,
        thumbnail: host + '/uploads/' + thumbName
      });
    }

    res.json({ uploaded: images });
  } catch (e) {
    res.status(500).json({ error: 'Erro no upload' });
  }
});

app.get('/api/images', (req, res) => {
  const host = 'http://localhost:' + PORT;

  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) return res.json({ images: [] });

    const imgs = files
      .filter(f => !f.startsWith('thumb_'))
      .map(f => ({
        filename: f,
        url: host + '/uploads/' + f,
        thumbnail: host + '/uploads/thumb_' + f
      }));

    res.json({ images: imgs });
  });
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
