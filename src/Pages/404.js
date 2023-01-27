import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div  className="wrapper">
      <h2>No se Encontro la Pagina</h2>
      <Link to="/signin">Logearse</Link>
    </div>
  )
}

export default NotFound
