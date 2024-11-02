const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка CORS
app.use(cors());

// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Папка для хранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
  }
});

const upload = multer({ storage });

// Эндпоинт для загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'Файл загружен успешно', filePath: req.file.path });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
