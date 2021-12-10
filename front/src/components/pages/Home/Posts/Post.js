import { GET, POST, DELETE } from '../../../../assets/api/confAxios';
import { useContext, useState, useEffect } from 'react';
import Card from "../../../UI/card/Card";
import DayJS from 'react-dayjs';
import Button from "../../../UI/button/Button";
import AuthContext from '../../../../context/Auth-context';
import Comment from "../Comments/Comment";
import CreateComment from "../Comments/CreateComment";

const Post = (props) => {
    const { post, onClick } = props;
    const ctx = useContext(AuthContext);
    
    //const [newPosts, setNewPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    
    const handleDelete = (id) => {
        onClick(id);     
    }

    useEffect(() => {
        const loadComments = async () => {
            try { 
                const response =  await GET('/api/post/' + post.id + '/comments');
                console.warn(post.id);
                const data = response.data;
                setComments(data);
                console.log('Chargement des commentaires réussis !');

            } catch (e) {
                setError(e); 
            }
        }
        loadComments();
    }, [])

    const handlerCreateComment = async (value) => {
        try {
            await POST( '/api/post/' + post.id + '/comments', value)
            const response =  await GET('/api/post/' + post.id + '/comments');
            const data = response.data;
            setComments(data);
            console.log('Commentaire bien créé !');

            const responseComment =  await GET('/api/post/' + post.id + '/comments');
            console.warn(post.id);
            const dataComment = responseComment.data;
            setComments(dataComment);
            console.log('Chargement des commentaires réussis !');
            
        } catch (e) {
            setError(e);
        }
	};

    const handlerDeleteCommentButton = async (id) => {
        try {
            await DELETE( '/api/post/' + post.id + '/comments/' + id);
            setComments(comments.filter( actualComment => actualComment.id !== id ));
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    return <li className="Post">
        {error && <div>{error}</div>}
        <Card className='Card'>
            <div>
                {post.userId && post.user.name}
            </div>
            <div className='DivProfil'>
                <img src={post.userId && post.user.imageUrl} className="ImgProfil" alt='photoPost' />
            </div>
            <div className="DatePost">                    
                <p>Publié le : </p><DayJS format="DD-MM-YYYY" date={post.createdAt}/>
            </div>
            <div className='DivPhoto'>
                <img src={post.imageUrl} className="ImgPost" alt='photoPost' />
            </div>
            <div>
                {post.title} <br/>
                {post.description}
            </div>
            {((ctx.user && ctx.user.isAdmin) || (ctx.user && ctx.user.id === post.userId)) && <Button text='Supprimer' onClick={() => handleDelete(post.id)} />}
            <div>
                <ul>
                    {comments.map(comment => {
                        return <Comment comment={comment} key={comment.id} onClick={handlerDeleteCommentButton} />;
                    })}
                </ul>
            </div>
            <CreateComment onAddCommentHandler={handlerCreateComment}/>
        </Card>
    </li>
}

export default Post;