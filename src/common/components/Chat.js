import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ChatActions from '../actions/chat';

function mapStateToProps(state) {
    return state.article;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ChatActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [{name: 'one', key: 1}]}
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

    renderUsers(users) {
        return users.map(user => {
            return <li key={user.key}>{user.name}</li>
        })
    }

    render() {
        const users = this.state.users;
        return (
            <section>
                <ul>
                    {this.renderUsers(users)}
                </ul>
                <textarea id="messageField" onChange={this.handleChange.bind(this)}/>
                <input type="button" value='Send Message' onClick={this.handleClick.bind(this)} />
            </section>
        )
    }
}