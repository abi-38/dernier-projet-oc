module.exports = (sequelize, Sequelize) => { // 1er instance = objet - 2éme instance librairie de sequelize
    const User = sequelize.define(
        "user", // sequelize va générer le nom de table users (au pluriel)
        {
        //id est automatiquement généré
        // de même pour createAt et updateAt
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true, 
                    msg: 'le nom est requis.'
                },
                notNull: {
                    args: true, 
                    msg: 'le nom ne peut pas être vide.'
                }
            }
        },
        imageUrl: {
            allowNull: true,
            type: Sequelize.STRING            
        },
        email: {
            type: Sequelize.STRING, 
            allowNull: false,
            unique: { 
                args: true, 
                msg: "L'adresse mail est déjà utilisée."
            },
            validate: {
                notEmpty: {
                    args: true, 
                    msg: "l'adresse mail est requis."
                },
                notNull: {
                    args: true, 
                    msg: "l'adresse mail ne peut pas être vide."
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true, 
                    msg: "le mot de passe est requis."
                },
                notNull: {
                    args: true, 
                    msg: "le mot de passe ne peut pas être vide."
                }
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
  
    return User;
};

//fonction de rôle ou d'administration