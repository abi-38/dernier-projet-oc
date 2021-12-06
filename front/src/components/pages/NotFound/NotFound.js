import "./NotFound.scss";
import AuthContext from '../../../context/Auth-context';
import { Redirect } from "react-router-dom";
import React, { useContext } from 'react';

export default function NotFound () {
  const ctx = useContext(AuthContext);

  if(!ctx.isLogin()) {
    return <Redirect push to="/" />
  }

  return (
    <div>
      <h1 className="NotFound">La page n'existe pas</h1>
    </div>
  );
}