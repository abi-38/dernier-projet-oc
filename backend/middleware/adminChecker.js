const jwt = require('jsonwebtoken');
const { post } = require('../models');
const db = require("../models");
const User = db.user;
const Post = db.post;
 
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.TOKEN); 
        const userId = decodedToken.data.userId; 
        const user = await User.findByPk(userId)
        req.user = user
        const postuser = await Post.findByPk(req.params.id)
        // l'utilisateur est admin ou c'est son post
        if(user.isAdmin || postuser.userId == user.id) {
            next();
        } else {
            throw res.status(402).json({ message: "Vous n'êtes pas Admin ou ce n'est pas votre post !" })
        } 
    }
    catch(error) {
        console.log(error)
        return res.status(401).json({ error: error | 'Utilisateur non authentifié !' })
    }
};