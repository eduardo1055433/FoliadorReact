import { Outlet } from 'react-router-dom'
import { Obtener_Nombre } from '../util/Info_token';
import React,{ useContext, useState, useEffect } from "react";
import AuthContext from "../Context/authProvider";
import Footer from './Footer';
import Header from './Header';
import Aside from './Aside';

const Layout = () => {
  const [name, setName] = useState('');
  
  useEffect(() => {

    const nombre = Obtener_Nombre();
    setName(nombre);
  });
  return (
    <div className="wrapper">
      <Header />
      <Aside usuario={name} />
        <Outlet />
      <Footer />

    </div>
  )
}


export default Layout


/*
<main className='App'>
      <h1>MENU {name}</h1>
      <button className="btn-warning" onClick={logout}>Logout</button>
      <button className="btn-warning" onClick={ONPRES}>PRINT</button>
      <button className="btn-info" onClick={HOME}>HOME</button>
      <br></br>
        <Outlet/>
    </main>
*/