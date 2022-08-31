const jwt = require('jsonwebtoken');

function auth ( req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if(!token) {
        return res.status(401).json({ Message : "Authorization failed!"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user ) => {


        if(err) {
            return res.status(403).json({ Message : "Authorization denied!"});

            // Token expired --> Create new access token using refresh token 
        
        }
        req.user = user;   
        next();
    });
}











module.exports = auth;
