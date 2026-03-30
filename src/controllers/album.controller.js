const jwt = require('jsonwebtoken');
const albumModel = require('../models/album.model');

async function createAlbum(req, res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "token required"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'artist'){
            return res.status(403).json({message: "you dont have access to create album"})
        }
        const {title, musicId} = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics,
        })

        res.status(201).json({
            message: "album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })

    } catch(err){
        console.log(err)
        res.status(401).json({message: "unauthorized access"})
    }
}
async function getAllAlbums(req, res){
    const albums = await albumModel.find().populate("artist", "username email").populate("musics")
    res.status(200).json({message: "album fetched successfully",
         album: albums
    })
}
async function getAlbumById(req, res){
    const albumId = req.params.albumId;

    const album = albumModel.findById(albumId).populate("artist", "username email")

    return res.status(200).json({message: "fetched succesuflly", 
        album: album
    })
}
module.exports = {createAlbum, getAllAlbums, getAlbumById}