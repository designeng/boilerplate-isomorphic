import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxRouter } from 'redux-router';

import createBrowserHistory from 'history/lib/createBrowserHistory'

var store;

export default function ReactRenderProviderPlugin(options) {
    return {
        factories: {
            renderRootProvider
        }
    }
}

const renderRootProvider = (resolver, compDef, wire) => {
    const { 
        rootElement,
        routes
    } = compDef.options;

    wire(compDef.options).then(({
        storeBuilder,
        history
    }) => {
        const initialState  = window.__INITIAL_STATE__;
        store               = storeBuilder(initialState);

        const renderReduxRouter = () => {
                    return <ReduxRouter>
                                <Router children={ routes } history={ history }/>
                            </ReduxRouter>
                    }

        resolver.resolve(React.render(
            <Provider store={ store } >
                { renderReduxRouter }
            </Provider>,
            rootElement
        ));
    });
}