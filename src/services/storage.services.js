const Imagekit = require('imagekit')
require('dotenv').config()

const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env

const imageKitClient = new Imagekit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
})

async function uploadFile(file) {
    const result = await imageKitClient.upload({
        file,
        fileName: `music_${Date.now()}`,
        folder: 'spotify-backend/music',
    })
    return result
}
module.exports =  {uploadFile}