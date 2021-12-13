const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const Op = db.sequelize.Op; 
const fs = require('fs'); // pour les fichiers img
const userModel = require("../models/user.model");
const { comment } = require("../models");

exports.createComment = (req, res, next) => {
  if(!req.body.text) {
    res.status(400).json({
      message: "Le texte ne peut pas être vide"
    });
    return;
  }
  Comment.create({ 
      ...req.body
    })
  .then((comment) => {
    comment.setUser(req.user);
    comment.setPost(req.params.id);
    return res.status(201).json(comment); 
  })
  .catch((err) => {
    return res.status(500).json({
      message: err.message || "Erreur pendant la création du commentaire"
      
    });
  });
};

exports.findAllComment = (req, res, next) => {

    Comment.findAll({
      where: { postId: req.params.id },
      include: [{
        model: User, attributes: // faire une jointure pour récupérer , cf. lien envoyé
        ['name', 'imageUrl'],
        as: 'user'
        }],
        order: [
         ['updatedAt', 'DESC'] // trie par date de modification des posts
        ]
    })
    .then((comment) => {
      return res.status(200).json(comment);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "some error occured while looking for the comments"
      });
    });
};

/*
exports.findOneComment = (req, res, next) => {
  Post.findByPk( req.params.id ) // findByPk à utiliser QUE pour récupérer un id
  .then((comment) => {
    if(comment === null) {
    res.status(400).json({
      message: "Le comment n'existe pas"
    });
    return;
  }
    return res.status(200).json(comment); 
  })
  .catch(error => res.status(404).json({ error: "Quelque chose s'est mal passé pendant la récupération du comment" })); 
};*/

/*
exports.updateComment = (req, res, next) => {
  const id = req.params.id;
  const commentObject = req.file ?
    {
      ...req.body, 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.update(commentObject, {where: { id: id }})
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
};*/


exports.deleteComment = (req, res, next) => {
  Comment.findByPk( req.params.commentId )
  // récup comment actuel + récupérer son img puis supprimer l'ensemble
  .then(comment => {
      Comment.destroy({where: {id: req.params.commentId} }) 
      .then(num => {
        if(num == 1) {
          return res.status(200).json({ message: "Le comment a été supprimé avec succès !" });
        } else {
          return res.status(400).json({
            message: `Can't delete Comment with id=${commentId}. Maybe Comment wasn't found`
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: `Error deleting Comment with id=${commentId}`
        });
      });
  })
  .catch(error => res.status(500).json({ message: "Le comment n'existe pas" }));
};