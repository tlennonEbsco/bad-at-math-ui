import React from 'react';
import './Message.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeComponent: this.props.clearStatus,
            message: this.props.status.message,
            type: this.props.status.type,
            fadeInterval: this.props.fadeInterval ? this.props.fadeInterval : 1500,
        };

    }
    
    componentDidMount() {
        this.interval = setInterval(() =>
            this.state.removeComponent(),
            this.state.fadeInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {  
        const { type, message } = this.state;
        
        return <h1 className={`message ${type}`}>{message}</h1>;
    }
}

export default Message;