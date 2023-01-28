//import './Css/App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout';
import HRPage from './Pages/RRHH/HRPage';
import MarketersPage from './Pages/Marketer/MarketersPage';
import SEPage from './Pages/SoftwareEng/SEPage';
import Register from './Pages/Acceso/Register';
import Signin from './Pages/Acceso/Signin';
import Home from './Pages/Home';
import Unauthorized from './Pages/Unauthorized';
import Auth from './util/Auth';
import Foliador from './Pages/Foliador/foliador';
import NotFound from './Pages/404';
import UserCard from './util/LoadBar';

function App() {
  return (
    <Routes>
      <Route path='/load' element={<UserCard />} />

      <Route path='/register' element={<Register />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/*' element={<NotFound />} />

      <Route element={<Auth allowedRoles={['admin']} />}>
      <Route path='/' element={<Layout />}>

        <Route path='/unauthorized' element={<Unauthorized />} />
          <Route element={<Auth allowedRoles={['admin']} />}>
            <Route path='/marketers-only' element={<MarketersPage />} />
            <Route path='/foliador' element={<Foliador />} />
            <Route path='/home' element={<Home />} />

          </Route>
          <Route element={<Auth allowedRoles={['se']} />}>
            <Route path='/se-only' element={<SEPage />} />
          </Route>
          <Route element={<Auth allowedRoles={['se']} />}>
            <Route path='/hr-Only' element={<HRPage />} />
          </Route>
      </Route>
      </Route>
    </Routes>

  );
}

export default App;
