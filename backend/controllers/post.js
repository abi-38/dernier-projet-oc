const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const Op = db.sequelize.Op; 
const fs = require('fs'); // pour les fichiers img
const userModel = require("../models/user.model");


exports.createPost = (req, res, next) => {
  //ici faire les console.log() -> regarder dans le terminal du back
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
    } : { 
      ...req.body
    };
  Post.create(postObject)
  .then((post) => {
    post.setUser(req.user);
    return res.status(201).json(post); 
  })
  .catch((err) => {
    return res.status(500).json({
      message: err.message || "Erreur pendant la création du post"
      
    });
  });
};

exports.findAllPost = (req, res, next) => {

    Post.findAll({
      include: [{
        model: User, attributes: // faire une jointure pour récupérer , cf. lien envoyé
          ['name', 'imageUrl'],
        as: 'user'
      },
      {
        model: Comment, attributes:
          ['text', "userId", 'id'],
      as: 'comment'
    }],
      order: [
         ['updatedAt', 'DESC'] // trie par date de modification des posts
      ]
    })
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
  .catch((err) => {
    return res.status(404).json({
      message: err.message || "some error occured while looking for the post"
    });
  });
};;

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
    if(post.imageUrl) {
      const filename = post.imageUrl.split('/images/')[1];
      console.warn(filename);
      fs.unlink(`images/${filename}`, () => {
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
    } else {
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
    }
  })
  .catch(error => res.status(500).json({ message: "Le post n'existe pas" }));
};