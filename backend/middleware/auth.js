const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
// pour installer dotenv -> npm install dotenv
// voir doc sur internet !
 
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // on sépare le token créé au niveau de l'espace et on prend la 2nd valeur
        // on se débarrasse du BEARED
        const decodedToken = jwt.verify(token, process.env.TOKEN); // on vérifie que le token correspond à ce qui était rentré
        const userId = decodedToken.data.userId; // on récupère l'idToken il est comme un objet js
        
        //const userImage = decodedToken.data.imageUrl; // on récupère l'idToken il est comme un objet js
        
        // faire la même chose pour la photo de profil du user
        const user = await User.findByPk(userId)
        req.user = user
        next();
    }
    catch(error) {
        console.log(error)
        return res.status(401).json({ error: error | 'Utilisateur non authentifié !' })
    }
};