const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const albumRoutes = require('./routes/album.routes')


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)
app.use('/api/album', albumRoutes)

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello, world!"})
})

module.exports = app;