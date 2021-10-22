module.exports = (sequelize, Sequelize) => { // 1er instance = objet - 2éme instance librairie de sequelize
    const Post = sequelize.define(
        "post", // sequelize va générer le nom de table posts (au pluriel)
        {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true, 
                    msg: "le titre est requis."
                },
                notNull: { // pour utiliser ceci impécher le null -> allowNull: false
                    args: true, 
                    msg: "le titre ne peut pas être vide."
                }
            }
        },
        urlPicture: {
            allowNull: true,
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }, // utiliser les validator custom
    });
  
    return Post;
};