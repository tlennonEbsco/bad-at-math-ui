import React from 'react';
import UploadStatus from './Message';
import style from './Upload.css';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.route,
            status: null,
            show: false,
        }
    }

    uploadFile() {
        var input = document.querySelector('input[type="file"]')

        if(input.files.length === 0) {
            this.setState({
                status: 'Please select a file.',
                type: 'error',
            });
            return;
        }

        var data = new FormData()
        data.append('sampleFile', input.files[0])
    
        fetch(this.state.route + '/upload', {
          method: 'POST',
          body: data,
        }).then(response => {
          if(response.ok) {
            this.setState({
              status: 'Successfully uploaded file.',
              type: 'info',
            });
          } else {
            this.setState({
              status: 'Unable to upload file.',
              type: 'warning',
            });
          }
        }) //TODO: Missing error handlers.
    }

    removeComponent() {
        this.setState({
            status: null
        })
    }

    render() {
        let status;
        if(this.state.status) {
            status = <UploadStatus 
                type={this.state.type} 
                status={this.state.status} 
                removeComponent={() => this.removeComponent()} 
                fade={true}
                fadeInterval={3000}
            />
        }//TODO Hoist this up higher? Yes. I don't want it here. I want a status up top.
        
        return (
            <div className='uploadContainer'>
                <input className='file-picker' type='file' />
                <button className="submit" onClick={() => this.uploadFile()}>Submit</button>
                {status}                
            </div>
        );
    }
}

export default Upload;