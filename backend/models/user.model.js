//const uniqueValidator = require('sequilize-unique-validator'); ??

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        photoProfil: {
            type: Sequelize.STRING //required: true ??
        },
        email: {
            type: Sequelize.STRING // comment gère-t-on l'unicité, utilise-t-on sequilize-unique-validator ? unique: true
        },
        password: {
            type: Sequelize.STRING 
        },
        description: {
            type: Sequelize.STRING 
        }
    });

    //userSchema.plugin(uniqueValidator);
  
    return User;
};