import React, { Component } from 'react';

export default class MessagesList extends Component {

    constructor(props) {
        super(props);
    }

    renderMessages(messages) {
        if(typeof messages === "undefined") return "";
        
        return messages.map(message => {
            return <li key={message.key}>{message.name}</li>
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