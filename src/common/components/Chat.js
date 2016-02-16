import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContactsActions from '../actions/contacts';
import * as MessagesActions from '../actions/messages';

import MessagesList from './chat/messages';

function mapStateToProps(state) {
    return {
        list            : state.contacts.list,
        messagesList    : state.messages.messagesList
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
        this.props.contactsGet()
        this.props.messagesGet()
        this.textarea = document.getElementById("messageField");
    }

    handleClick() {
        this.props.messageSend({
            message: this.textarea.value, 
            userId: 'John'
        });
    }

    handleChange(event) {
        
    }

    renderContacts(contactsList) {
        if(typeof contactsList == "undefined" || contactsList.length === 0) return "";
        
        console.log("contactsList::::::", contactsList);
        return contactsList.map(contact => {
            return <li key={contact.key}>{contact.name}</li>
        });
    }

    render() {
        const { list, messagesList } = this.props;

        return (
            <section>
                <ul>
                    { this.renderContacts(list) }
                </ul>
                <MessagesList messages={ this.props.messagesList }/>
                <textarea id="messageField" onChange={this.handleChange.bind(this)}/>
                <input type="button" value='Send Message' onClick={this.handleClick.bind(this)} />
            </section>
        )
    }
}

Chat.need = [
    ContactsActions.contactsGet
]

export default Chat;