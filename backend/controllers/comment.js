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

exports.deleteComment = (req, res, next) => {
  Comment.findByPk( req.params.commentId )
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