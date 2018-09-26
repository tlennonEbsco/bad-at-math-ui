import React from 'react';
import { FileWrapper} from './FileWrapper';
import { UploadStatus } from './UploadStatus';
export const defaultRoute = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      isLoading: false,
      error: null,
      uploadStatus: null,
    }
  }
  
  componentDidMount() {
    this.setState( {
      isLoading: true
    });

    fetch(defaultRoute + '/file')
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .then(data => { this.setState({files: data.files, isLoading: false}) })
    .catch(error => this.setState({ error, isLoading:false}));
  }

  uploadFile() {
    var input = document.querySelector('input[type="file"]')

    var data = new FormData()
    data.append('sampleFile', input.files[0])

    fetch(defaultRoute + '/upload', {
      method: 'POST',
      body: data,
    }).then(response => {
      if(response.ok) {
        this.setState({
          uploadStatus: 'successfully uploaded file.',
        })
      } else {
        this.setState({
          uploadStatus: 'unable to upload file.',
        })
      }
    })

  }

  render() {
    const { files, isLoading, error, uploadStatus } = this.state;

    if(error) {
      return <p>{error.message}</p>
    }

    if(isLoading) {
      return <p>Loading...</p>
    }

    let uploadStatusComp;

    if(uploadStatus) {
      console.log(uploadStatus);
      uploadStatusComp = <UploadStatus message={this.state.uploadStatus.message} />
    }

    return (
      <div>
        <FileWrapper files={files} route={defaultRoute}/>

        <input type='file'></input>
          <button className="submit" onClick={() => this.uploadFile()}>
            Submit
          </button>
          {uploadStatusComp}
      </div>
    );
  }
}

export default App;
