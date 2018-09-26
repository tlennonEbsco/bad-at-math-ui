import React from 'react';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.route,
            uploadStatus: null,
        }
    }

    uploadFile() {
        var input = document.querySelector('input[type="file"]')
        console.log(input.files.length);
        if(input.files.length === 0) {
            this.setState({
                uploadStatus: 'Please select a file.'
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
              uploadStatus: 'Successfully uploaded file.',
            })
          } else {
            this.setState({
              uploadStatus: 'Unable to upload file.',
            })
          }
        })
    }

    render() {
        return (
            <div>
                <input type='file' />
                <button className="submit" onClick={() => this.uploadFile()}>Submit</button>
                <p>{this.state.uploadStatus}</p>
            </div>
        );
    }
}

export default Upload;