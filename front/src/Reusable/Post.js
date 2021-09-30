import React from 'react';
import PostList from '../Listes/postList';
import Button from './Button';
import PostStyle from '../Reusable/PostStyle.scss';

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

export default Post;