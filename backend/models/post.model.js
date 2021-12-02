module.exports = (sequelize, Sequelize) => { 
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
                notNull: { 
                    args: true, 
                    msg: "le titre ne peut pas être vide."
                }
            }
        },
        imageUrl: {
            allowNull: true,
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });
    return Post;
};