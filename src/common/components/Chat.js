import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContactsActions from '../actions/contacts';
import * as MessagesActions from '../actions/messages';

import MessagesList from './chat/messages';

function mapStateToProps(state) {
    return {
        list        : state.contacts.list,
        messages    : state.messages.messages
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...ContactsActions, ...MessagesActions }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.contactsGet();
        this.props.messagesGet();
        this.textarea = document.getElementById("messageField");
    }

    handleClick() {
        const message = {
            message: this.textarea.value, 
            userId: 'John'
        }
        // optimistic update
        this.props.messageAdd(Object.assign({}, {presentMessages: this.props.messages, message: Object.assign({message: message.message + " OPT"})}));
        // send message to server
        this.props.messageSend(message);
    }

    handleChange(event) {
        
    }

    renderContacts(contactsList) {
        // TODO: how to avoid it?
        if(typeof contactsList == "undefined" || contactsList.length === 0) return "";
        
        return contactsList.map(contact => {
            return <li key={contact.key}>{contact.name}</li>
        });
    }

    render() {
        const { list, messages } = this.props;

        return (
            <section>
                <ul>
                    { this.renderContacts(list) }
                </ul>
                <MessagesList messages={ this.props.messages }/>
                <textarea id="messageField" onChange={this.handleChange.bind(this)}/>
                <input type="button" value='Send Message' onClick={this.handleClick.bind(this)} />
            </section>
        )
    }
}

Chat.need = [
    ContactsActions.contactsGet,
    MessagesActions.messagesGet
]

export default Chat;