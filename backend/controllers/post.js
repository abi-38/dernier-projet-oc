const db = require("../models");
const User = db.user;
const Post = db.post;
const Op = db.sequelize.Op; // à quoi ça sert ? est-ce bien utile ?
const fs = require('fs'); // pour les fichiers img

    // faut-il utiliser les returns ?? .save() est manquant ?
exports.createPost = (req, res, next) => {
  // nécessaire -> delete req.body._id; Non
  if(!req.body.title) {
    res.status(400).send({
      message: "Content can't be empty !"
    });
    return;
  }
  Post.create({
    title: req.body.title,
    //userId: req.body.userId,
    description: req.body.description,
    //urlPicture: req.body.urlPicture,
    //...req.body, <- on peut l'utiliser ? 

    /* comment traiter ceci ? */
    //profilPicture: req.body.profilPicture,
    //userName: req.body.userName,  
  })
    .then((post) => {
      post.setUser(req.user);
      return res.status(201).json(post); 
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "some error occured while creating the post"
      });
    });
};

// à essayer dans un 2nd temps
/*
exports.createPost = (req, res, next) => {
  // nécessaire -> delete req.body._id; ?
  if(!req.body.title) {
    res.status(400).send({
      message: "Content can't be empty !"
    });
    return;
  }
  const postObject = JSON.parse(req.body.post);
  // faut-il delete postObject.id ?
  Post.create({
  ...postObject, 
  urlPicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //-> est-ce ok ? 
  })
    .then((post) => {
      res.status(201).send(post); // ou .json(post) ??
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating the post"
      });
    });
};*/

exports.findAllPost = (req, res, next) => {
  /*
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
    Post.findByPk( req.params.id )
    .then((post) => {
      res.status(200).json(post); 
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "some error occured while creating the post"
      });
    });
    /*OU  
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
    */    
};

exports.updatePost = (req, res, next) => {
    //vérifier update
    const id = req.params.id;
    Post.update(req.body, {where: { id: id }} /* ou ceci ? { _id: req.params.id }, { ...req.body, _id: req.params.id }*/)
    .then(num => {
      if(num == 1) {
        res.status(200).send({ message: "Post was updated successfully !" });
      } else {
        res.status(400).send({
          message: `Can't update Post with id=${id}. Maybe Post wasn't found or req.body is empty`
        });
      }
       // ou .json(post) ??
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Post with id=${id}`
      });
    });
    /*OU  
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
    */  
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
      res.status(200).send({ message: "Post was updated successfully !" });
    } else {
      res.status(400).send({
        message: `Can't update Post with id=${id}. Maybe Post wasn't found or req.body is empty`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error updating Post with id=${id}`
    });
  });
};
*/

exports.deletePost = (req, res, next) => {
    Post.destroy({where: {id: req.params.id} }) // on cherche l'id qui correspond à celui qu'on veut supprimé (envoyé par la requête front)
    .then(num => {
      if(num == 1) {
        res.status(200).send({ message: "Post was deleted successfully !" });
      } else {
        res.status(400).send({
          message: `Can't delete Post with id=${id}. Maybe Post wasn't found`
        });
      }
       // ou .json(post) ??
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting Post with id=${id}`
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
          res.status(200).send({ message: "Post was deleted successfully !" });
        } else {
          res.status(400).send({
            message: `Can't delete Post with id=${id}. Maybe Post wasn't found`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error deleting Post with id=${id}`
        });
      });
    });
  })
  .catch(error => res.status(500).json({ error }));
};*/

// élément qui sera à supprimer
exports.getPost = (req, res, next) => {
    const PostList = [
        {
            id: 0,
            photoProfil: 'Photo1',
            nom : 'Arthur',
            dateDePublication: '11/08/2021',
            imagePublication: 'PhotoPost1', 
            descriptionPublication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna'
            },
        {
            id: 1,
            photoProfil: 'Photo2',
            nom : 'Salomé',
            dateDePublication: '02/09/2021',
            imagePublication: 'PhotoPost2',
            descriptionPublication: 'aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. '
        },
    ];
    res.status(200).json(PostList);
};


