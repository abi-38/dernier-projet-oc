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
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        description: req.body.description
                    } : 
                    { 
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        description: req.body.description
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
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) 
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe non trouvé !' });
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
        return res.status(400).json({ error: 'Email ou mdp invalide !' });
    }
};

exports.getUser = (req, res, next) => {
    User.findByPk( req.user.dataValues.id) // findByPk à utiliser QUE pour récupérer un id
    .then((user) => {
    console.log(req.user)

    if(user === null) {
    res.status(400).json({
      message: "L'utilisateur n'existe pas"
    });
    return;
    }
    return res.status(200).json(user); 
    })
   .catch(error => res.status(404).json({ error: "Quelque chose s'est mal passé pendant la récupération de l'utilisateur" })); 
}

exports.deleteUser = (req, res, next) => {
    // ici vérifier l'id token correspond au front
    User.findByPk( req.params.id )
    .then(user => {
        if(req.file) {
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.destroy({where: {id: req.params.id} }) 
            .then(num => {
            if(num == 1) {
                return res.status(200).json({ message: "User was deleted successfully !" });
            } else {
                return res.status(400).json({
                message: `Can't delete User with id=${id}. Maybe User wasn't found`
                });
            }
            })
            .catch((err) => {
            return res.status(500).json({
                message: `Error deleting User with id=${id}`
            });
            });
        });
        } else {
        User.destroy({where: {id: req.params.id} }) 
        .then(num => {
            if(num == 1) {
            return res.status(200).json({ message: "User was deleted successfully !" });
            } else {
            return res.status(400).json({
                message: `Can't delete User with id=${id}. Maybe User wasn't found`
            });
            }
        })
        .catch((err) => {
            return res.status(500).json({
            message: `Error deleting User with id=${id}`
            });
        });
        }
    })
    .catch(error => res.status(500).json({  message: "Le user n'existe pas"  }));
}

exports.updateUser = (req, res, next) => {
    const id = req.params.id;
    const userObject = req.file ?
      {
        ...req.body, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    User.update(userObject, {where: { id: id }})
    .then(num => {
      if(num == 1) {
        res.status(200).json(userObject); // { message: "User was updated successfully !" }
      } else {
        res.status(400).json({
          message: `Can't update User with id=${id}. Maybe User wasn't found or req.body is empty`
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error updating User with id=${id}`
      });
    });
};

exports.updatePasswordUser = (req, res, next) => {
    const id = req.params.id;
    console.warn(id);
    const mdpReg = new RegExp(/^[\w\-]{6,}$/);
    const validMdp = mdpReg.test(req.body.password); 
    console.warn(validMdp);

    if(validMdp) {
        bcrypt.hash(req.body.password, 10)
        .then(
            hash => {
                User.update({password: hash}, {where: { id: id }})
                .then(num => {
                    if(num == 1) {
                      res.status(200).json({ message: "User was updated successfully !" });
                    } else {
                      res.status(400).json({
                        message: `Can't update User with id=${id}. Maybe User wasn't found or req.body is empty`
                      });
                    }
                })
        })
        .catch((err) => {
            res.status(500).json({
              message: `Error updating User with id=${id}`
            });
          });

    } else {
        return res.status(400).json({ error: 'Email ou mot de passe non valide !' })
    }
};