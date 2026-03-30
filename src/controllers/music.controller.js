const jwt = require('jsonwebtoken')
const musicModel = require('../models/music.model')
const { uploadFile } = require('../services/storage.services')

async function createMusic(req, res) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message:
                'Invalid access — use Cookie token from login or header: Authorization: Bearer <token>',
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: 'you dont have access to create music' })
        }

        if (!req.file) {
            return res.status(400).json({ message: 'music file is required (form field name: music)' })
        }

        const { title } = req.body
        if (!title) {
            return res.status(400).json({ message: 'title is required' })
        }

        const result = await uploadFile(req.file.buffer)

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        })

        res.status(201).json({
            message: 'music created successfully',
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            },
        })
    } catch (err) {
        console.error(err)
    }
}

async function getAllMusic(req, res){
    // const musics = await musicModel.find()
    // const musics = await musicModel.find().populate("artist") // by using this we can get complete artist details
    const musics = await musicModel
    .find()
    // .skip(2) skip 1st and 2nd item but not applicable here
    .limit(5) // load one time 5 items only not all at once (upper limit)
    .populate("artist", "username email")

    res.status(200).json({
        message: "All music fetched successfully",
        musics: musics
    });
}
module.exports = { createMusic, getAllMusic }
