import React from 'react';
import styles from './Message.css'
import { CSSTransitionGroup } from 'react-transition-group' // ES6

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
            this.setState({
                status: null,
            }),
            this.state.fadeInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {  
        const { type, status } = this.state;
        
        let statusMessage;
        if(!status) {
            statusMessage = null;
        } else {
            statusMessage = <h1 className={`message ${type}`}>{status}</h1>;
        }
        return (

            <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionLeave={true}
                transitionLeaveTimeout={1000}>
                {statusMessage}
            </CSSTransitionGroup>
        )
    }
}

export default Message;