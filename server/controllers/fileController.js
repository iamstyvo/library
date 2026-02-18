const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs-extra');
const { getAllFiles, getFileById, addFile, deleteFile } = require('../data/fileStorage');

// Upload file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get optional metadata from request body
    const { title, examType, examYear, publishDate, description } = req.body;

    const fileData = {
      id: uuidv4(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadDate: new Date().toISOString(),
      extension: path.extname(req.file.originalname).toLowerCase(),
      title: title || req.file.originalname,
      examType: examType || 'General',
      examYear: examYear ? parseInt(examYear) : new Date().getFullYear(),
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      description: description || ''
    };

    const savedFile = await addFile(fileData);
    
    res.status(201).json({
      message: 'File uploaded successfully',
      file: savedFile
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed', message: error.message });
  }
};

// Get all files
const getFiles = async (req, res) => {
  try {
    const files = await getAllFiles();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

// Get file by ID
const getFile = async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
};

// Download file
const downloadFile = async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '../uploads', file.filename);
    
    // Check if file exists
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Length', file.size);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed', message: error.message });
  }
};

// Delete file
const deleteFileHandler = async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '../uploads', file.filename);
    if (await fs.pathExists(filePath)) {
      await fs.unlink(filePath);
    }

    // Delete from metadata
    const deleted = await deleteFile(req.params.id);
    
    if (deleted) {
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete file from database' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Delete failed', message: error.message });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  deleteFileHandler
};