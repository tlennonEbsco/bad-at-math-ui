import React from 'react';
import FileWrapper from './File/FileWrapper';
import Upload from './Upload/Upload';
import { bam }  from '../package.json'
export const defaultRoute = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      isLoading: false,
      error: null,
      automaticReload: true,
      fetchInterval: 5000,
      route: `${bam.route}:${bam.port}`,
    }
  }

  fetchFiles() {
    fetch(`${this.state.route}/file`)
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

  componentDidMount() {
    this.setState( {
      isLoading: true
    });

    this.fetchFiles();

    if(this.state.automaticReload) {
      this.interval = setInterval(() => 

        this.fetchFiles(), this.state.fetchInterval
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

        <FileWrapper files={files} route={this.state.route}/>

        <Upload route={this.state.route} />
      </div>
    );
  }
}

export default App;
