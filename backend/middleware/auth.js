const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
//require('dotenv').config(); -> on verra plus tard
// pour installer dotenv -> npm install dotenv
// voir doc sur internet !
 
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // on sépare le token créé au niveau de l'espace et on prend la 2nd valeur
        // on se débarrasse du BEARED
        const decodedToken = jwt.verify(token, process.env.TOKEN); // on vérifie que le token correspond à ce qui était rentré
        const userId = decodedToken.userId; // on récupère l'idToken il est comme un objet js
        /*if(req.body.userId && req.body.userId !== userId){ // ne sert à rien
            throw 'User Id non valable !';
        } else {
            next(); // si tout est bon on peut passer à la suite
        }*/
        const user = await User.findByPk(userId)
        req.user = user
        next();
    }
    catch(error) {
        console.log(error)
        return res.status(401).json({ error: error | 'Utilisateur non authentifié !' })
    }
};