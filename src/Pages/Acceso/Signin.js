import { useNavigate, useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/authProvider";

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
      fetch(url+`/login`, {
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
  )
}

export default Signin
