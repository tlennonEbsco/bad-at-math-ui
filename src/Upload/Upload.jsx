import React from 'react';

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
                <input className='file-picker' type='file' />
                <button className="submit" onClick={() => this.state.parent.uploadFile()}>Submit</button>

            </div>
        );
    }
}

export default Upload;