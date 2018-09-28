import React from 'react';
import { FileIcon } from '../Svg/SvgFile'
import './Upload.css';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.route,
            status: null,
            show: false,
            parent: this.props.parent,
        }
    }

    render() {
        return (
            <div className='uploadContainer'>
                    
                <input name='file' id='file' type='file' className='file-input'/>
                <label for='file'>
                <FileIcon />
                Choose a file
                </label>
                
                <button className="submit" onClick={() => this.state.parent.uploadFile()}>Submit</button>
                
            </div>
        );
    }
}

export default Upload;