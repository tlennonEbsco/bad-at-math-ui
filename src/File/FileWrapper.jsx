import React from 'react';
import File from './File';
import Upload from '../Upload/Upload';
import UploadStatus from '../Message/Message';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

class FileWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            route: this.props.route,
            status: null,
        }
    }
/*
    status: {
        message: 'message',
        type: 'type'
    }
*/
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
        fetch(`${this.state.route}/file/${fileName}`, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    this.setState({
                        status: {
                            message: "successfully deleted the file.",
                            type: 'info'
                        },
                    });
                    this.fetchFiles();
                } else {
                    throw new Error(`Unable to delete, ${fileName}`)
                }
            }).then(parseError => {
                console.log(parseError);
            });
    }

    uploadFile() {
        var input = document.querySelector('input[type="file"]')

        if(input.files.length === 0) {
            this.setState({
                status: {
                    message: 'Please select a file.',
                    type: 'error',
                }
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
                status: {
                    message: 'Successfully uploaded file.',
                    type: 'info',
                }
            });
            this.fetchFiles();
          } else {
            this.setState({
              status: {
                  message: 'Unable to upload file.',
                type: 'warning',
              }
            });
          }
        }) //TODO: Missing error handlers.
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

    clearStatus() {
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
                clearStatus={() => this.clearStatus()} 
                fadeInterval={3000}
            />
        }

        if(this.state.isLoading) {
            return <p>Loading...</p>
        }
  
        return (
            <div>
                <div className='file-container'>
                    <h3 className='header'>Available Files:</h3>
                    {this.state.files.map(file =>
                        <File name={file} route={this.props.route} key={file} parent={this} />
                    )}

                    <Upload route={this.state.route} parent={this}/>


                <CSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionLeaveTimeout={500}>
                    {status}       
                </CSSTransitionGroup>

                </div>
            </div>
        );
    }
}

export default FileWrapper;