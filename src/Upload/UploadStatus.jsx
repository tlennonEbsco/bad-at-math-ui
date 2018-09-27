import React from 'react';

class UploadStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeComponent: this.props.removeComponent,
            status: this.props.status,
            fade: this.props.fade ? this.props.fade : false,
        };
    }
    
    componentDidMount() {
        if(this.state.fade) {
            this.interval = setInterval(() =>
            this.state.removeComponent(), 
            2000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(!this.state.status) {
            return null;
        }
    
        return (
            <div className='good'>
                {this.state.status}
            </div>
        );
    }
}

export default UploadStatus;