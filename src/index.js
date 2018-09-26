import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FileWrapper} from './FileWrapper';

export const defaultRoute = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      isLoading: false,
      error: null,
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
    }).then((response) => {
      console.log(response);
    })
  }
 
  render() {
    const { files, isLoading, error } = this.state;

    if(error) {
      return <p>{error.message}</p>
    }

    if(isLoading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <FileWrapper files={files} />

        <input type='file'></input>
          <button className="submit" onClick={() => this.uploadFile()}>
            Submit
          </button>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
