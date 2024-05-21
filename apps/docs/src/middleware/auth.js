const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const isUserConnected = function(req, res, next)  {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.status(401).send({msg: 'No token, authorization denied'});
        return;
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403).send({msg: "Token is not valid"});
            return;
        }
        req.user = decoded;
        next();
    })
}

module.exports = {
    isUserConnected
}
