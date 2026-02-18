const fs = require('fs-extra');
const path = require('path');

const dataFile = path.join(__dirname, 'files.json');

// Initialize data file if it doesn't exist
const initializeData = async () => {
  try {
    await fs.ensureFile(dataFile);
    const exists = await fs.pathExists(dataFile);
    if (!exists || (await fs.readFile(dataFile, 'utf8')).trim() === '') {
      await fs.writeJson(dataFile, []);
    }
  } catch (error) {
    console.error('Error initializing data file:', error);
  }
};

// Get all files
const getAllFiles = async () => {
  try {
    await initializeData();
    const data = await fs.readJson(dataFile);
    return data;
  } catch (error) {
    console.error('Error reading files:', error);
    return [];
  }
};

// Get file by ID
const getFileById = async (id) => {
  try {
    const files = await getAllFiles();
    return files.find(file => file.id === id);
  } catch (error) {
    console.error('Error finding file:', error);
    return null;
  }
};

// Add new file
const addFile = async (fileData) => {
  try {
    const files = await getAllFiles();
    files.push(fileData);
    await fs.writeJson(dataFile, files);
    return fileData;
  } catch (error) {
    console.error('Error adding file:', error);
    throw error;
  }
};

// Delete file
const deleteFile = async (id) => {
  try {
    const files = await getAllFiles();
    const filteredFiles = files.filter(file => file.id !== id);
    await fs.writeJson(dataFile, filteredFiles);
    return filteredFiles.length < files.length;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  initializeData,
  getAllFiles,
  getFileById,
  addFile,
  deleteFile
};