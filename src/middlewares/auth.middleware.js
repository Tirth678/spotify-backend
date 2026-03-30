const jwt = require('jsonwebtoken');

async function authArtist(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Unauthorised access"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(token, process.env.JWT_SECRET){
            return res.status(403).json({message: "you dont have access"})
        }
        req.user = decoded
           next()
    } 

     catch(err){
        console.log(err)
        res.status(401).json({message: "access invalid"})
    }
}

async function authUser(req, res, next){
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        if(decoded.role !== 'role' && decoded.role !== 'artist'){
            res.status(401).json({message: "Unauthorized access"})
        }

        next()
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Uauthorized"}) 
    }
}
module.exports = {authArtist, authUser}