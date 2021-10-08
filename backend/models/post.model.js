module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        // faut-il aussi mettre les éléments du profil photoProfile et userName
        // ou userId suffit ? 
        userId: {
            type: Sequelize.STRING
        },
        profilPicture: {
            type: Sequelize.STRING 
        },
        userName: {
            type: Sequelize.STRING 
        },
        urlPicture: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.NUMBER // comment on note les date ?
        },
        description: {
            type: Sequelize.STRING
        },
    });
  
    return Post;
};