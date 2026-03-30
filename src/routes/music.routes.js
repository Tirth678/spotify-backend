const express = require('express')
const router = express.Router();
const musicController = require('../controllers/music.controller')
const { createAlbum } = require('../controllers/album.controller')
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
})
const authMiddleware = require('../middlewares/auth.middleware')
const { getAllAlbums } = require('../controllers/album.controller');

router.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.createMusic)
router.post('/album', upload.single('album'), getAllAlbums)
router.get('/', musicController.getAllMusic)
router.get('/albums/:albumId', authMiddleware.authUser, getAllAlbums)
module.exports = router;
