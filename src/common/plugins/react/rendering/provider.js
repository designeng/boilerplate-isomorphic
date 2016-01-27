import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxRouter } from 'redux-router';

import createBrowserHistory from 'history/lib/createBrowserHistory'

const renderRootProvider = (resolver, compDef, wire) => {
    const configureStore    = compDef.options.store;
    const rootElement       = compDef.options.rootElement;
    const routes            = compDef.options.routes;

    wire(compDef.options).then((options) => {
        const configureStore    = options.configureStore;
        const history           = createBrowserHistory();

        const initialState  = window.__INITIAL_STATE__;
        const store         = configureStore(initialState);

        resolver.resolve(React.render(
            <Provider store={store}>
                {() =>
                    <ReduxRouter>
                        <Router children={routes} history={history}/>
                    </ReduxRouter>
                }
            </Provider>,
            rootElement
        ));
    });
}

export default function ReactRenderProviderPlugin(options) {
    return {
        factories: {
            renderRootProvider
        }
    }
}