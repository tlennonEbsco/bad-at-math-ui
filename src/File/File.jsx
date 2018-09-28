import React from 'react';
import './File.css'

class File extends React.Component {
  render() {
    return (
      <div className='file'>
        <p className='file-name'> {this.props.name} </p>
        <a className='download-button' href={`${this.props.route}/file/${this.props.name}`} >Download</a>
        <span className='delete-button' onClick={() => this.props.deleteFile.deleteFile(this.props.name, this.props.route)}>Delete</span>
      </div>
    )
  }
}

export default File;