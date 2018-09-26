import React from 'react';
import { File } from './File';

export function FileWrapper(props) {
    return (
        <div>
            <h3 className='header'>Available Files:</h3> 
            {props.files.map(file =>
                <File fileLocation={file}/>
            )}
        </div>
    );
}