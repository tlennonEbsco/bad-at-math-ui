import React from 'react';
import File from './File';

class FileWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }
    fetchFiles() {
        fetch(`${this.props.route}/file`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then(data => { this.setState({ files: data.files, isLoading: false }) })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    deleteFile(fileName) {
        fetch(`${this.props.route}/file/${fileName}`)
            .then(response => {
                if (response.ok) {

                } else {
                    throw new Error('Something went wrong...');
                }
            })
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });

        this.fetchFiles()

        this.interval = setInterval(() => 
            this.fetchFiles,
            5000
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    // shouldComponentUpdate(nextProps) {
    //     if (nextProps.files.length !== this.props.files.length) return true;

    //     const setNextProps = new Set(nextProps.files);
    //     var difference = [...new Set([...this.props.files].filter(x => !setNextProps.has(x)))];
    //     return difference.length > 0 ? true : false;
    // }

    render() {
        
        if(this.state.isLoading) {
            return <p>Loading...</p>
        }
  
        return (
            <div className='file-container'>
                <h3 className='header'>Available Files:</h3>
                {this.state.files.map(file =>
                    <File name={file} route={this.props.route} key={file} />
                )}
            </div>
        );
    }
}

export default FileWrapper;