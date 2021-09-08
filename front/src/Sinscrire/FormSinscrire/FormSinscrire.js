import React from 'react';
import Input from '../../Reusable/Input';
import sinscriresList from '../../Listes/sinscrireList';
import '../../Listes/sinscrireList';
import '../../Reusable/Input.scss';


function FormSinscrire() {
    return (
    <FormSinscrire>
        {sinscriresList.map(champ => {
            return <li key={champ.id} className="Input">
            <Input champ={champ} />
            </li>
            })
        }
    </FormSinscrire>
    )
}

export default FormSinscrire;