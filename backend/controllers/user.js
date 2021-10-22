const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.user;
const Op = db.sequelize.Op; // à quoi ça sert ? est-ce bien utile ?
const jwt = require('jsonwebtoken'); 

// penser à rajouter la gestion des images de profil... multer

exports.signup = (req, res, next) => {
    const emailReg = new RegExp(/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/); // regex pour vérifier la cohérence de l'email
    const validEmail = emailReg.test(req.body.email);
    const mdpReg = new RegExp(/^[\w\-]{6,}$/);
    const validMdp = mdpReg.test(req.body.password); // regex pour vérifier la cohérence du mdp
    if(validEmail && validMdp) {
        bcrypt.hash(req.body.password, 10)
        .then(
            hash => {
                User.create({
                    // comment on traite le userId -> c'est automatique
                    name: req.body.name,
                    //photoProfil: req.file.filename
                    email: req.body.email,
                    password: hash,
                    description: req.body.description
                })
                .then((user) => {
                    console.log(user)
                    return res.status(201).json({ message: 'Utilisateur créé !' })}
                )
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error })
        }); //ou .json() ?

    } else {
        return res.status(400).json({ error: 'Email ou mot de passe non valide !' })
    }
};

exports.login = (req, res, next) => {
    const emailReg = new RegExp(/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/);
    const validEmail = emailReg.test(req.body.email);
    const mdpReg = new RegExp(/^[\w\-]{6,}$/);
    const validMdp = mdpReg.test(req.body.password);
    if(validEmail && validMdp) {
        User.findOne( {
            where: {email: req.body.email}
        }) // 
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur ou mot de passe non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // U majuscule ?
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Utilisateur ou mot de passe non trouvé !' });
            }
            return res.status(200).json({
                userId: user.id, 
                token: jwt.sign({
                    //exp
                    data:{
                        userEmail: user.email,
                        userId: user.id
                    }
                },
                    process.env.TOKEN, // RANDOM_TOKEN_SECRET - pahdtcps521199cjneyslfh1545sljfsss1145
                    { expiresIn: '6 hours' } 
                )
            });
            })
            .catch(error => res.status(500).send({ error }));
        })
        .catch(error => res.status(500).send({ error })); // ou .json ?
    } else {
        throw 'Email ou mot de passe non valide !';
    }
};
