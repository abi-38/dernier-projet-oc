import { MDBTabsItem } from 'mdb-react-ui-kit';
import React from 'react';
import PostList from '../Listes/postList';
import Button from './Button';
//import PostStyle from '../Reusable/PostStyle.scss';
const axios = require('axios');
const GET = require('../api/confAxios'); // Import GET ok ?
//import { useState } from 'react';

/*
const Post = () => {
    return (
        <div>
            {PostList.map(post => {
                    return <li key={post.id} className="Post">
                    <div className='Identification'>
                        <div className='DivProfil'>
                            <img src={post.photoProfil} className='PhotoProfil' alt='photoProfil' />
                        </div>
                        <div>
                            {post.nom} <br/>
                            {post.dateDePublication}
                        </div>
                        <div className='DivPhoto'>
                            <img src={post.imagePublication} className="ImgPost" alt='photoPost' />
                        </div>
                        <div>
                            {post.descriptionPublication}
                        </div>
                        <Button type='button' text="J'aime" />
                        <Button type='button' className='Bouton-link__GreyButton' text="Je n'aime pas" />
                    </div>
                    </li>
                })
                }
        </div>
    );
}
*/


const Post = async () => {
    try {
        // la fonction GET ne fonctionne pas... 
        const response = await axios.get('http://localhost:3000/api/post');
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.status;
    } catch (error) {
      console.error(error);
    }
    // comment exploiter la const
}


/*
const Post = async () => {
    constructor(props) {
        super (props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [], // plutot un objet ?
        }
    }

    try {
        // la fonction GET ne fonctionne pas... 
        const response = await axios.get('http://localhost:3000/api/post');
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    posts: result.posts //à vérifier
                });
            }
        )
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    } catch (error) {
      console.error(error);
    }
    // comment exploiter la const

    return (
        <ul>
            {posts.map(post => {
                <li key={post.id} className="Post">
                    {post.nom} {post.dateDePublication}
                </li>
            })}
        </ul>
    )
}
*/

/*
class Post extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [], // plutot un objet ?
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/post")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    posts: result.posts //à vérifier
                });
            }
        ),
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }
    render() {
        const { error, isLoaded, posts } = this.state;
        if (error) {
            return <div>Erro: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return(
                <ul>
                    {posts.map(post => {
                        <li key={post.id} className="Post">
                            {post.nom} {post.dateDePublication}
                        </li>
                    })}
                </ul>
            )
        }
    }
}
*/

export default Post;