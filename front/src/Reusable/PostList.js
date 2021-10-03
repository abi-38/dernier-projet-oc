import React from 'react';
const axios = require('axios');
const GET = require('../api/confAxios'); // Import GET ok ?

const Postlist = async () => {
    try {
        // la fonction GET ne fonctionne pas... 
        const response = await axios.get('http://localhost:3000/api/post');
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    } catch (error) {
      console.error(error);
    }
    
    // comment exploiter la const result pour 
    //la mettre dans le .map et que les posts s'affichent
}

export default PostList;