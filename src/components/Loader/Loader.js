import React from 'react';
import loadSrc from '../../assets/loading.gif';
import './styles.css';

const Loader = (props) =>{
  return (
    <div className='fieldLoad'>
      <img src={loadSrc} alt="loadSrc"/>
    </div>
  );
}

export default Loader;