import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "./loading.css"

function Loading() {
  return (
    <div className='loaderContainer'>
        <Spinner animation="border" variant="warning"/>
        <span className='loadingText'> Loading... </span>
    </div>
  )
}

export default Loading