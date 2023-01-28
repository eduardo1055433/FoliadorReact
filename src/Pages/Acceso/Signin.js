import '../../Css/Signin.css';
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/authProvider";
import { Link } from 'react-router-dom';

const url = "http://localhost:8881";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home"
  const { auth, setAuth } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(url + `/login`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          correo_user: name, pass_user: password
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.body.user.token)
          if (res.message) {
            console.log(res);
            const role = ['marketer', 'se'];
            const token = res.body.user.token;
            const ruta = res.body.user.ruta;

            setAuth({ role, token, name });
            console.log(auth);
            sessionStorage.setItem('user-token', token);
            sessionStorage.setItem('user-ruta', ruta);

            setName('');
            setPassword('');
            navigate(from, { replace: true });
          }
          else {
            console.log('incorrect submission');
          }
        })


      console.log('working');
    }
    catch (err) {
      if (!err?.response) {
        setError('no server response');
      }
      else {
        setError('registeration failed')
      }
    }
  }

  return (
  <div className="container">
  <div className="row">
    <div className="col-md-6 offset-md-3">
      <h2 className="text-center text-dark mt-5">Foliador</h2>
      <div className="text-center mb-5 text-dark">software de Sisplani eirl</div>
      <div className="card my-5">
        <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
          <div className="text-center">
            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile" />
          </div>
          <p>{error}</p>
          <div className="mb-3">
            <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="email" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-color px-5 mb-5 w-100" disabled={!name && !password ? true : false} >Login</button>
          </div>
          <div id="emailHelp" className="form-text text-center mb-5 text-dark">
            No Registrado? 
            <Link className="text-dark fw-bold" to="/register"> Registrarse</Link> 
          </div>
          

        </form>
      </div>
    </div>
  </div>
</div>


  )
}

export default Signin

/*
<div className="App">
      <form onSubmit={handleSubmit}>
        <p>{error}</p>
        <h1>SignIn</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type='text'
            id='username'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type='text'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={!name && !password ? true : false}>Submit</button>
      </form>
    </div>

*/