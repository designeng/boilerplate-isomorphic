import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxRouter } from 'redux-router';

import createBrowserHistory from 'history/lib/createBrowserHistory'

var store;

function renderRootProvider(resolver, compDef, wire) {
    const rootElement       = compDef.options.rootElement;
    const routes            = compDef.options.routes;

    wire(compDef.options).then((options) => {
        const storeBuilder      = options.storeBuilder;
        const history           = createBrowserHistory();

        const initialState  = window.__INITIAL_STATE__;
        store               = storeBuilder(initialState);

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

function runDevToolsInParallel(resolver, facet, wire){
    // let target = facet.target;
    // console.log("store:::::>>>>>>>>", target);
    // // if (process.env.NODE_ENV !== 'production') {
    // //     require('../../../../server/devtools')(store, window);
    // // }
    resolver.resolve();
}

export default function ReactRenderProviderPlugin(options) {
    return {
        factories: {
            renderRootProvider
        },
        facets: {
            'ready:after': runDevToolsInParallel
        }
    }
}