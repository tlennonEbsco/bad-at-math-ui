import React from 'react';
import styles from './Message.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeComponent: this.props.removeComponent,
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
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {  
        const { type } = this.state;

        return (
            <div className={`message + ${type}`}>
                {this.state.status}
            </div>
        );
    }
}

export default Message;