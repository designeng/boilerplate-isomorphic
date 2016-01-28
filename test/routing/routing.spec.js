import { assert } from 'chai'

import wire                 from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';
import routingSystemPlugin  from '../../src/server/plugins/routing/crossroads';

describe('routing system',  () => {

    let rootContext = {};

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin,
                routingSystemPlugin
            ],
            routingSystem: {
                createRouter: {
                    name: 'mainRouter'
                },
                initRoutes: {
                    routes: [
                        {route: '/home'         , component: "Home"},
                        {route: '/experiment'   , component: "Experiment"}
                    ]
                }
            }
        })
        .then((context) => {
            rootContext = context;
            done();
        })
        .otherwise((error) => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should be ok',  (done) => {
        assert.ok(rootContext.routingSystem)
        done();
    });
});