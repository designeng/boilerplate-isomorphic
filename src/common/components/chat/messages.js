import React, { Component } from 'react';

export default class MessagesList extends Component {

    constructor(props) {
        super(props);
    }

    renderMessages(messages) {
        if(typeof messages === "undefined") return "";
        
        return messages.map(message => {
            let key = message.id;
            return <li key={key}>{message.userId} : {message.text}</li>
        });
    }

    render() {
        const { messages } = this.props;

        return (
            <section>
                <ul> 
                    { this.renderMessages(messages) }
                </ul>
            </section>
        )
    }
}