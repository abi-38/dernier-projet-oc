module.exports = (sequelize, Sequelize) => { 
    const Comment = sequelize.define(
        "comment", // sequelize va générer le nom de table posts (au pluriel)
        {
        text: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true, 
                    msg: "le texte est requis."
                },
                notNull: { 
                    args: true, 
                    msg: "le texte ne peut pas être vide."
                }
            }
        }
    });
    return Comment;
};