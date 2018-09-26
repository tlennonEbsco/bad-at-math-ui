import React from 'react';
import { defaultRoute } from '.';

export function File(props) {
  return (
    <div className='file'>
        <p className='file-name'>{props.fileLocation}</p>
        <a className='download-button' href={defaultRoute + '/file/' + props.fileLocation}>
            <img src={require('.\\download-32.png')} alt=''/>
        </a>
    </div>
  );
}