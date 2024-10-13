const express = require('express');
const imgRoute = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/' });
const path = require('path');
const Images = require('./imguplschema');

imgRoute.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No image provided');
        }

        const { name, webkitRelativePath, type, size, } = req.file;
        const image = new Images ({name, webkitRelativePath, contentType: type, size});
        await image.save();
        res.status(201).json(req.file)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image: ' + error.message);
    }
});

imgRoute.get('/images/:id', async (req, res) => {
    try {
        const image = await Images.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        const filePath = path.join(__dirname, image.path); //joins the directory to the path of the file and makes it an aboslute path
        res.contentType(image.contentType);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving image');
    }
});

module.exports = imgRoute;