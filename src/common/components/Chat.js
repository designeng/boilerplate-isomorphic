import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContactsActions from '../actions/contacts';

function mapStateToProps(state) {
    console.log("state:::::::::", state);
    return {contacts: state.contacts};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ContactsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.socket = io(this.props.socketIoHost);
        this.textarea = document.getElementById("messageField");
    }

    handleClick() {
        let message = this.textarea.value
        this.socket.emit('chat_click', {message: message});
        console.log("CLICK", message);

        this.store.dispatch({type: 'MESSAGES_GET_REQUEST'})
    }

    handleChange(event) {
        console.log("TARGET::::", event.target.value);
    }

    renderContacts(contacts) {
        return contacts.map(user => {
            return <li key={contact.key}>{contact.name}</li>
        })
    }

    render() {
        const {isFetching, contacts, error} = this.props;
        return (
            <section>
                <ul>
                    {this.renderContacts(contacts)}
                </ul>
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