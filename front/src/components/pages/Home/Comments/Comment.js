import Card from "../../../UI/card/Card";
import DayJS from 'react-dayjs';
import Button from "../../../UI/button/Button";
import { useContext, useState } from 'react';
import AuthContext from '../../../../context/Auth-context';

const Comment = (props) => {
    const { comment, onClick } = props;
    const ctx = useContext(AuthContext);
    
    const handleDelete = (idComment) => {
        onClick(idComment);     
    }

    return <li>
        <div>
            <div>
                {comment.user.name}
            </div>
            <div className="DatePost">                    
                <p>Publié le : </p><DayJS format="DD-MM-YYYY" date={comment.createdAt}/>
            </div>
            <div>
                {comment.title} <br/>
                {comment.text}
            </div>
            {((ctx.user && ctx.user.isAdmin) || (ctx.user && ctx.user.id === comment.userId)) && <Button text='Supprimer' onClick={() => handleDelete(comment.id)} />}
        </div>
    </li>
}

export default Comment;

