import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContactsActions from '../actions/contacts';
import config from '../config';

function mapStateToProps(state) {
    return {list: state.contacts.list};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ContactsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount....");
        this.props.contactsGet()
    }

    componentDidMount() {
        this.socket = io(config.socketio.host);
        this.textarea = document.getElementById("messageField");
    }

    handleClick() {
        let message = this.textarea.value
        
        this.socket.emit('chat_click', {message: message});
        console.log("CLICK", message);

        // this.store.dispatch({type: 'MESSAGES_GET_REQUEST'})
    }

    handleChange(event) {
        console.log("TARGET::::", event.target.value);
    }

    renderContacts(contactsList) {
        if(typeof contactsList === "undefined") return "";
        
        return contactsList.map(contact => {
            return <li key={contact.key}>{contact.name}</li>
        });
    }

    render() {
        const { list } = this.props;

        return (
            <section>
                <ul>
                    { this.renderContacts(list) }
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