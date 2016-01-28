import React, { Component }  from 'react';
import ReactDom from 'react-dom';

class Application extends Component {
    render() {
        return (
            <div>123</div>
        );
    }
}

// TODO: root -> this (mocha, es6 ?)
let root = {}

describe('components rendering',  () => {

    const before = () => {
        root._rootElement = document.createElement("div");
        document.body.appendChild(root._rootElement);
    }

    beforeEach(before);

    it('should render application',  () => {
        ReactDom.render(<Application />, root._rootElement);

        // TODO
        // assert.equal(document.querySelector('#app-wrapper').innerHTML, 'Navigation Component');
    });
});