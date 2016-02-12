import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import classNames from 'classnames';

import * as UserActions from '../actions/user';
import * as LayoutActions from '../actions/layout';

import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Home from '../components/Home'

function mapStateToProps(state) {
    return {
        article: state.article,
        contacts: state.contacts,
        user: state.user,
        layout: true
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(LayoutActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    constructor(props) {
        super(props);
        this.eventToggleSidebar = this.eventToggleSidebar.bind(this)
        this.eventUndo = this.eventUndo.bind(this)
        this.eventRedo = this.eventRedo.bind(this)
    }

    eventToggleSidebar(e) {
        e.preventDefault();
        this.props.toggleSidebar(!this.props.layout.sidebarOpen);
    }

    eventUndo(e) {
        e.preventDefault();
        this.props.undo();
    }

    eventRedo(e) {
        e.preventDefault();
        this.props.redo();
    }

    render() {

        const { user, layout } = this.props;
        const layoutClass = classNames('theme-base-00', 'wrapper' );

        return (
            <div className={layoutClass}>
                <Sidebar layout={layout} user={user} />
                <div className="wrap">
                    <Header />
                    <div className="container content">
                        {!this.props.children && <Home />}
                        {this.props.children}
                    </div>
                </div>
                <label className="sidebar-toggle" onClick={this.eventToggleSidebar}></label>
                <label className="undo-button" onClick={this.eventUndo}>&lt;</label>
                <label className="redo-button" onClick={this.eventRedo}>&gt;</label>
            </div>
        );
    }
}