const express = require('express');
const router = express.Router();
const { createAlbum } = require('../controllers/album.controller');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})


router.post('/album', upload.single('album'), createAlbum);
// router.get('/albums', )

module.exports = router;