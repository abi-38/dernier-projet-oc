
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user", // sequelize va générer le nom de table users (au pluriel)
        {
        //id est automatiquement généré
        // de même pour createAt et updateAt
        name: {
            type: DataTypes.STRING,
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
        /*photoProfil: {
            type: DataTypes.STRING, 
            allowNull: false
        },*/
        email: {
            type: DataTypes.STRING, 
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
            type: DataTypes.STRING,
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
            type: DataTypes.STRING 
        }
    });
  
    return User;
};