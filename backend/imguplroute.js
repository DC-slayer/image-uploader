const express = require('express');
const imgRoute = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Images = require('./imguplschema');

cloudinary.config({
    cloud_name: 'drtcsabfh',
    api_key: '557969389876262',
    api_secret: 'xWB-3zjarSgjCDpl1GFLzP9z0u0'
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Folder name in Cloudinary to store images
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed file types
    },
  });

const upload = multer({ storage: storage });

imgRoute.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No image provided');
        }

       // Extract image details from the uploaded file
    const { originalname, mimetype, size } = req.file;
    const imageUrl = req.file.path; // Cloudinary URL

    // Save image metadata to MongoDB
    const image = new Images({
      name: originalname,
      contentType: mimetype,
      size: size,
      imageUrl: imageUrl,
    });

    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully', image });
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