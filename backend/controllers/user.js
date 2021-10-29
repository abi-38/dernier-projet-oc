const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.user;
const Op = db.sequelize.Op; 
const jwt = require('jsonwebtoken'); 

// penser à créer le updateSignup ou updateProfil
// changement de la description, de la photo, du mdp ou du nom
// impossible de changer l'email !!!

// mettre en place la suppression de compte

exports.signup = (req, res, next) => {
    // regex pour vérifier la cohérence de l'email
    const emailReg = new RegExp(/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/); 
    const validEmail = emailReg.test(req.body.email);
    const mdpReg = new RegExp(/^[\w\-]{6,}$/);
    // regex pour vérifier la cohérence du mdp
    const validMdp = mdpReg.test(req.body.password); 
    if(validEmail && validMdp) {
        bcrypt.hash(req.body.password, 10)
        .then(
            hash => {
                const userObject = req.file ?
                    {
                        ...req.body,
                        password: hash,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    } : 
                    { 
                        ...req.body,
                        password: hash
                    };
                User.create(userObject)
                .then((user) => {
                    console.log(user)
                    return res.status(201).json({ message: 'Utilisateur créé !' })}
                )
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error })
        }); 

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
        }) 
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur ou mot de passe non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) 
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Utilisateur ou mot de passe non trouvé !' });
            }
            return res.status(200).json({
                userId: user.id, 
                exp: Math.floor( Date.now() / 1000 ) + (60*60),
                token: jwt.sign({
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
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        throw 'Email ou mot de passe non valide !';
    }
};
