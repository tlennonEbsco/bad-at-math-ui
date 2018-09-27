import React from 'react';
import { File } from './File';

export function FileWrapper(props) {
    return (
        <div className='file-container'>
            <h3 className='header'>Available Files:</h3> 
            {props.files.map(file =>
                <File name={file} route={props.route} key={file}/>
            )}
        </div>
    );
}