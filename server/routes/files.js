const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  deleteFileHandler
} = require('../controllers/fileController');

// Upload a file
router.post('/upload', upload.single('file'), uploadFile);

// Get all files
router.get('/', getFiles);

// Get a specific file
router.get('/:id', getFile);

// Download file
router.get('/:id/download', downloadFile);

// Delete file
router.delete('/:id', deleteFileHandler);

module.exports = router;