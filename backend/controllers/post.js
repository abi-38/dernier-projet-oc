const db = require("../models");
const User = db.user;
const Post = db.post;
const Op = db.sequelize.Op; // à quoi ça sert ? est-ce bien utile ?
const fs = require('fs'); // pour les fichiers img

  // .save() n'est pas nécessaire en sequelize
  
/*exports.createPost = (req, res, next) => {
  // pas nécessaire -> delete req.body._id;
  if(!req.body.title) {
    res.status(400).json({
      message: "Rentrer le titre du post"
    });
    return;
  }
  Post.create({
    //title: req.body.title,
    //description: req.body.description,
    ...req.body,
  })
    .then((post) => {
      post.setUser(req.user); // userId n'est pas récupéré
      return res.status(201).json(post); 
      // vérifier qu'on pourra bien récupérer le photo de profil de l'utilisateur
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Erreur pendant la création du post"
      });
    });
};*/


// à essayer dans un 2nd temps
exports.createPost = (req, res, next) => {
  if(!req.body.title) {
    res.status(400).json({
      message: "Le contenu ne peut pas être vide"
    });
    return;
  }
  const postObject = JSON.parse(req.body.post);
  Post.create({
  ...postObject, 
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
  })
  .then((post) => {
    return res.status(201).json(post);
  })
  .catch((err) => {
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

exports.updatePost = (req, res, next) => {
    const id = req.params.id;
    Post.update(req.body, {where: { id: id }})
    .then(num => {
      if(num == 1) {
        res.status(200).json({ message: "Le post a été modifié avec succès !" });
        return;
      } else {
        return res.status(400).json({
          message: `Le post id=${id} n'a pas pu être modifié. Peut-être qu'il n'a pas été trouvé ou que la req.body est vide`
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: `Erreur pour la modification du post id=${id}`
      });
    });  
};

// à essayer dans un 2nd temps
/*
exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.update(...postObject, {where: { id: id }})
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
*/

// les messages d'erreur ne fonctionnent pas...
exports.deletePost = (req, res, next) => {
  Post.destroy({where: {id: req.params.id}}) 
  // on cherche l'id qui correspond à celui qu'on veut supprimé 
  .then(num => {
    if(num == 1) {
      res.status(200).json({ message: "Le post a été supprimé avec succès" });
      return;
    } else {
      return res.status(400).json({
        message: `Nous ne pouvons pas supprimer le post id=${id}. Peut-être que le post n'a pas était trouvé`
      });
    }
  })
  .catch((err) => {
    return res.status(500).json({
      message: `Erreur dans la suppression du post id=${id}`
    });
  });
  
  /*.then(post => { // il nous renvoie la post en question à surpprimer
    const filename = post.imageUrl.split('/images/')[1]; // on récupére son nom,on split la chaine de caractères au niveau de images puis on prend la 2nd valeur
    fs.unlink(`images/${filename}`, () => { // on appelle une fonciton de fs 'unlike' pour supprimer un fichier - elle prend en paramétre le dossier et le nom de l'image
      Post.destroyOne({ _id: req.params.id }) // dans le callback de fs.unlike / une fois l'image supprimé on supprime le reste des info de la sauce
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));*/
};

// à essayer dans un 2nd temps
/*
exports.deletePost = (req, res, next) => {
  Post.findByPk( req.params.id )
  .then(post => {
    const filename = post.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Post.destroy({where: {id: req.params.id} }) 
      .then(num => {
        if(num == 1) {
          res.status(200).json({ message: "Post was deleted successfully !" });
        } else {
          res.status(400).json({
            message: `Can't delete Post with id=${id}. Maybe Post wasn't found`
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error deleting Post with id=${id}`
        });
      });
    });
  })
  .catch(error => res.status(500).json({ error }));
};*/
