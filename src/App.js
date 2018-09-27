import React from 'react';
import FileWrapper from './File/FileWrapper';
import Upload from './Upload/Upload';
import { bam }  from '../package.json'
export const defaultRoute = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      automaticReload: true,
      fetchInterval: 2000,
      route: `${bam.route}:${bam.port}`,
    }
  }

  render() {
    const { files, error } = this.state;

    if(error) {
      return <p>{error.message}</p>
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
