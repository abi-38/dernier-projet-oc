module.exports = (sequelize, Sequelize) => { 
    const Comment = sequelize.define(
        "comment", // sequelize va générer le nom de table posts (au pluriel)
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
        text: {
            allowNull: true,
            type: Sequelize.STRING
        }
    });
    return Comment;
};