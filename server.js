'use strict';

const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage, limits: {fileSize: 5000000, files: 1}});
const app = express();

app.use(express.static(__dirname + '/public'));

const api = '/api/fileanalyze';
// TODO: Add error handler for files larger than 5 MB
app.post(api, upload.single('inputFile'), (req, res, next) => {
  res.json({
    filename: req.file.originalname,
    size: `${req.file.size} bytes`
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
})