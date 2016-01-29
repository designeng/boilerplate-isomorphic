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
    const rootElement           = compDef.options.rootElement;
    const routes                = compDef.options.routes;

    wire(compDef.options).then((options) => {
        const storeBuilder      = options.storeBuilder;
        const history           = createBrowserHistory();

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