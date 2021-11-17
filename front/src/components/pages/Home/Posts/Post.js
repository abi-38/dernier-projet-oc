import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import {DELETE, GET} from '../../../../assets/api/confAxios';
//const GET = require('../api/confAxios'); -> interdit + ne pas mettre le require avant import
import Card from "../../../UI/card/Card";
import DayJS from 'react-dayjs';

const Post = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState('');
    //const [imageUrl, setImageUrl] = useState('');


    
    useEffect(() => {
        const loadPosts = async () => {
            const response =  await GET('/api/post');
            const data = response.data;
            if (response.status === 200) { //Base sur le code de status du retour de l'api
                setPosts(data);
                console.log('Chargement des posts réussis !');
                //setImageUrl(localStorage.getItem('imageUser'));
                
            } else {
                setError('Une erreur a été rencontré lors de la récupération des posts'); //Ou message d'erreur provenant de l'api
            }
            
        }
        setIsLoaded(true)
        loadPosts();
        setIsLoaded(false);
    }, [])

    /*const handlerButton = (props) => {
        const buttonValue= this.props.value;
        console.warn(buttonValue)
    }*/

    /*const handlerButton = async (event) => {
        //event.preventDefault();
        //const postId = event.target.value;
        this.setState({value: event.target.value});
        //const postId = this.props.value;
        console.warn(state);
        const response = await DELETE( '/api/post/' + state) // + Comment récupérer le post.id)
        if(response.status === 200 ) {
            console.log('Post bien supprimé !');
            setError(false)
        } else {
            setError('Une erreur a été rencontré lors de la suppression du post') //mettre message api
            console.log(error);
            setError(true)
        }

    }*/
    
    const renderPost = (posts) => {
        //essayer desctructuring 
        //console.warn(imageUrl);
        const postId = posts.id;
        //const {id, imageUrl, createdAt, title, description} = props; + retirer props partout!
        return <li key={postId} className="Post">
            <Card className='Card'>
                <div className='DivProfil'>
                    <img src={posts.imageUrl} className="ImgProfil" alt='photoPost' />
                </div>
                <div>                    
                    <p>Publié le : </p><DayJS format="DD-MM-YYYY" date={posts.createdAt}/>
                </div>
                <div className='DivPhoto'>
                    <img src={posts.imageUrl} className="ImgPost" alt='photoPost' />
                </div>
                <div>
                    {posts.title} <br/>
                    {posts.description}
                </div>
                <Button type='button' value={postId} /*onClick={handlerButton('value')}*/ className='Bouton-link__GreyButton' text="Supprimer" />
            </Card>
        </li>
    }
    // accolades = return

    return (
    
        <ul>
            {posts.map(post => {
                return renderPost(post)
            })}
        </ul>
    )
}

export default Post;