import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/authProvider";
import jwt from 'jwt-decode' // import dependency
import React from 'react'


const Auth = ({ allowedRoles }) => {
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    let rol = '';
    let usuario = '';

    const userToken = sessionStorage.getItem('user-token');
    if(userToken !== null){
      var decoded = jwt(userToken);
      //console.log(decoded.user.rol +"  <-->  "+decoded.user.nombre);
      rol = decoded.user.rol;
      usuario = decoded.user.nombre;
    }    

     
  return (
    rol !== undefined && rol !== undefined?
      allowedRoles.find(role => rol.includes(role))
        // auth.role.find(role => allowedRoles?.includes(role))
        ? <Outlet/>
        : usuario
          ? <Navigate to="/unauthorized" state={{ from: location}} replace/>
          : <Navigate to="/register" state={{from: location}} replace/>
    :
      <Navigate to="/unauthorized" state={{ from: location}} replace/>
  )
}

export default Auth;

