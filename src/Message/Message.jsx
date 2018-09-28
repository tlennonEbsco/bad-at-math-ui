import React from 'react';
import './Message.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeComponent: this.props.clearStatus,
            status: this.props.status,
            fade: this.props.fade ? this.props.fade : false,
            type: this.props.type ? this.props.type : null,
            fadeInterval: this.props.fadeInterval ? this.props.fadeInterval : 1500,
        };

    }
    
    componentDidMount() {
        if(this.state.fade) {
            this.interval = setInterval(() =>
            this.state.removeComponent(),
            this.state.fadeInterval);
        }

        this.interval = setInterval(() =>
        this.state.removeComponent(),
        1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {  
        const { type, status } = this.state;
        
        return <h1 className={`message ${type}`}>{status}</h1>;
    }
}

export default Message;