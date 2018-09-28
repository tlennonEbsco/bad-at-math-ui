import React from 'react';
import './File.css'
import { DeleteIcon, LinkIcon } from '../Svg/SvgFile';

class File extends React.Component {
  render() {
    return (
      <div className='file'>
        <p className='file-name'> {this.props.name} </p>
        
        <a className='download-button' href={`${this.props.route}/file/${this.props.name}`} ><LinkIcon /></a>

        <span className='delete-button' onClick={() => this.props.parent.deleteFile(this.props.name, this.props.route)}><DeleteIcon /></span>

      </div>
    )
  }
}

export default File;