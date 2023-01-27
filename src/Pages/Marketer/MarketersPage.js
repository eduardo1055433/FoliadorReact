import React from 'react'
import {Link} from 'react-router-dom'

const MarketersPage = () => {
  return (
    <div  className='App'>
      <h1>Marketers Page</h1>
      <p>Welcome marketer how's the market going</p>
      <Link to="/linkpage">Go to link pages</Link>

    </div>
  )
}

export default MarketersPage
