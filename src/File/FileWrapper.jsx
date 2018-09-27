import React from 'react';
import { File } from './File';

class FileWrapper extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(nextProps.files) {
            const setNextProps = new Set(nextProps.files);
            var difference = [...new Set([...this.props.files].filter(x => !setNextProps.has(x)))];
            console.log(difference.length > 0 ? true : false);
            return difference.length > 0 ? true : false;
        }
        return false;
    }

    render() {
        return (
            <div className='file-container'>
                <h3 className='header'>Available Files:</h3> 
                {this.props.files.map(file =>
                    <File name={file} route={this.props.route} key={file}/>
                )}
            </div>
        );
    }
}

export default FileWrapper;