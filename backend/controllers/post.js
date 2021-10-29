const db = require("../models");
const User = db.user;
const Post = db.post;
const Op = db.sequelize.Op; // à quoi ça sert ? est-ce bien utile ?
const fs = require('fs'); // pour les fichiers img

// .save() n'est pas nécessaire en sequelize

exports.createPost = (req, res, next) => {
  if(!req.body.title) {
    res.status(400).json({
      message: "Le contenu ne peut pas être vide"
    });
    return;
  }
  const postObject = req.file ?
    {
      ...req.body, 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.create(postObject)
  .then((post) => {
    //post.setUser(req.user); // userId n'est pas récupéré 
    //cf. doc juste fait userId = userId et envoyer manuellement l'id utilisateur du front...
    return res.status(201).json(post); 
    // vérifier qu'on pourra bien récupérer le photo de profil de l'utilisateur
  })
  .catch((err) => {
    console.log(req.body.imageUrl)
    return res.status(500).json({
      message: err.message || "Erreur pendant la création du post"
      
    });
  });
};

exports.findAllPost = (req, res, next) => {
  /* se faire expliquer ceci ??
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%`} }: null; */

    Post.findAll()
    .then((posts) => {
      return res.status(200).json(posts); 
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "some error occured while looking for the posts"
      });
    });
};

exports.findOnePost = (req, res, next) => {
  Post.findByPk( req.params.id ) // findByPk à utiliser QUE pour récupérer un id
  .then((post) => {
    if(post === null) {
    res.status(400).json({
      message: "Le post n'existe pas"
    });
    return;
  }
    return res.status(200).json(post); 
  })
  .catch(error => res.status(404).json({ error: "Quelque chose s'est mal passé pendant la récupération du post" })); 
};


// fonctionne mais ne prend pas en compte l'annulation d'une image lors de la modif...
exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const postObject = req.file ?
    {
      ...req.body, 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.update(postObject, {where: { id: id }})
  .then(num => {
    if(num == 1) {
      res.status(200).json({ message: "Post was updated successfully !" });
    } else {
      res.status(400).json({
        message: `Can't update Post with id=${id}. Maybe Post wasn't found or req.body is empty`
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error updating Post with id=${id}`
    });
  });
};

exports.deletePost = (req, res, next) => {
  Post.findByPk( req.params.id )
  .then(post => {
    // on récupére le nom du fichier,
    //on split la chaine de caractères au niveau de images puis on prend la 2nd valeur
    const filename = post.imageUrl.split('/images/')[1];
    // on appelle une fonciton de fs 'unlike' pour supprimer un fichier 
    //elle prend en paramétre le dossier et le nom de l'image
    fs.unlink(`images/${filename}`, () => {
      // dans le callback de fs.unlike, une fois l'image supprimé 
      //on supprime le reste des info du post
      Post.destroy({where: {id: req.params.id} }) 
      .then(num => {
        if(num == 1) {
          return res.status(200).json({ message: "Post was deleted successfully !" });
        } else {
          return res.status(400).json({
            message: `Can't delete Post with id=${id}. Maybe Post wasn't found`
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: `Error deleting Post with id=${id}`
        });
      });
    });
  })
  .catch(error => res.status(500).json({  message: "Le post n'existe pas"  }));
};
