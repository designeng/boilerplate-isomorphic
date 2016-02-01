import React from 'react';
import { match } from 'react-router';
import createLocation from 'history/lib/createLocation';

import { fetchComponentDataBeforeRender } from '../../../../common/api/fetchComponentDataBeforeRender';

import renderFullPage from './view/renderFullPage';
import getInitialView from './view/getInitialView';

function addWildcardRouteMiddleware(resolver, facet, wire) {
    let target          = facet.target;
    const routes        = facet.options.routes;

    wire(facet.options).then(options => {
        const store         = options.store;
        const authorized    = options.authorized;
        const messages      = options.messages;

        target.get('/*', function (req, res) {

            if (!authorized)
                return res.status(401).end(messages['404']);

            const location = createLocation(req.url);

            match({routes, location}, (err, redirectLocation, renderProps) => {

                if (err) {
                    console.error(err);
                    return res.status(500).end(messages['500']);
                }

                if (!renderProps)
                    return res.status(404).end(messages['404']);

                //This method waits for all render component promises to resolve before returning to browser
                fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
                    .then(html => {
                        const componentHTML = React.renderToString(getInitialView(store, renderProps));
                        const initialState = store.getState();
                        res.status(200).end(renderFullPage(componentHTML, initialState))
                    })
                    .catch(err => {
                        res.end(renderFullPage("", {}))
                    });

            });

        });
        resolver.resolve(target);
    });
}

export default function WildcardRoutePlugin(options) {
    return {
        facets: {
            wildcardRouteMiddleware: {
                initialize: addWildcardRouteMiddleware
            }
        }
    }
}