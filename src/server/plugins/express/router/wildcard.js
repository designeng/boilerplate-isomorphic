import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';

import { fetchComponentDataBeforeRender } from '../../../../common/api/fetchComponentDataBeforeRender';

import configureStore   from '../../../../common/store/configureStore';
import { getUser }      from '../../../../common/api/user';

import renderFullPage from './view/renderFullPage';
import getInitialView from './view/getInitialView';

function addWildcardRouteMiddleware(resolver, facet, wire) {
    let target = facet.target;
    const routes = facet.options.routes;
    target.get('/*', function (req, res) {
        const location = createLocation(req.url);
        getUser(user => {
            if (!user) {
                return res.status(401).end('Not Authorised');
            }

            match({routes, location}, (err, redirectLocation, renderProps) => {

                if (err) {
                    console.error(err);
                    return res.status(500).end('Internal server error');
                }

                if (!renderProps)
                    return res.status(404).end('Not found');
                let store;

                store = configureStore({user: user});

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
    });
    resolver.resolve(target);
}

export default function WildcardRoutePlugin(options) {
    return {
        facets: {
            addWildcardRouteMiddleware: {
                initialize: addWildcardRouteMiddleware
            }
        }
    }
}