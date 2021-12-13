const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
// pour installer dotenv -> npm install dotenv
// voir doc sur internet !
 
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN); 
        const userId = decodedToken.data.userId;
        const user = await User.findByPk(userId)
        req.user = user
        next();
    }
    catch(error) {
        console.log(error)
        return res.status(401).json({ error: 'Utilisateur non authentifié !' })
    }
};