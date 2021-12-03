import Card from "../../../UI/card/Card";
import DayJS from 'react-dayjs';
import Button from "../../../UI/button/Button";
import { useContext } from 'react';
import AuthContext from '../../../../context/Auth-context';

const Post = (props) => {
    const {post, onClick} = props;
    const ctx = useContext(AuthContext);
    
    
    const handleDelete = (id) => {
        onClick(id);     
    }

    return <li key={post.id} className="Post">
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
            {ctx.user && ctx.user.isAdmin && <Button text='Supprimer' onClick={() => handleDelete(post.id)} />}
            
        </Card>
    </li>
}

export default Post;