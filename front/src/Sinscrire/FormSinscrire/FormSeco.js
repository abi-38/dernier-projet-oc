import React from 'react';
import Input from '../../Reusable/Input';
import seConnecterList from '../../Listes/seConnecterList';
import '../../Reusable/Input.scss';

function FormSeCo () {
  return (
    <FormSeCo>
      {seConnecterList.map(champ => {
          return <li key={champ.id} className="Input">
          <Input champ={champ} />
          </li>
        })
      }
    </FormSeCo>
  )
}

export default FormSeCo;

