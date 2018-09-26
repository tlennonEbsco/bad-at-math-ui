import React from 'react';
import { defaultRoute } from '.';

export function File(props) {
  return (
    <div className='red'>
        <p className='file-name green'>{props.fileLocation}</p>
        <a className='download-button blue' href={defaultRoute + '/file/' + props.fileLocation}>
            <img src={require('.\\download-32.png')} alt=''/>
        </a>
    </div>
  );
}