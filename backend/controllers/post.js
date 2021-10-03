exports.createPost = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Post créé !'
    });
}

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
}