import React from "react";
import { Link } from "react-router-dom";

export default function Aside({ usuario }) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Sisplani 3.0</span>
      </Link>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {usuario}
            </a>
          </div>
        </div>
         
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Operaciones
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to='/foliador' className="nav-link ">       {/**active */}             
                    <i className="far fa-circle nav-icon" />
                    <p>Sisplani-Foliador</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/se-only' className="nav-link">                    
                    <i className="far fa-circle nav-icon" />
                    <p>Software Engineers only</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/marketers-only' className="nav-link">                    
                    <i className="far fa-circle nav-icon" />
                    <p>Marketers Only</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/hr-only' className="nav-link">                    
                    <i className="far fa-circle nav-icon" />
                    <p>Human Resource personnels only</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-copy" />
                <p>
                  Administración
                  <i className="fas fa-angle-left right" />
                  <span className="badge badge-info right">1</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                <Link to='/register' className="nav-link" >
                <i className="far fa-circle nav-icon" />
                    <p>Registrar Cliente </p>
                </Link>


                </li>                
              </ul>
            </li>             

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
