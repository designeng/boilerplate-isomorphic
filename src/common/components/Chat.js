import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContactsActions from '../actions/contacts';
import * as MessagesActions from '../actions/messages';

function mapStateToProps(state) {
    return {
        list: state.contacts.list
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