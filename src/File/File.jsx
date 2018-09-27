import React from 'react';

export function File(props) {
  return (
    <div className='file'>
        <p className='file-name'>{props.name}</p>
        <a className='download-button' href={props.route + '/file/' + props.name}>
            <img src={require('..\\download-32.png')} alt=''/>
        </a>
    </div>
  );
}