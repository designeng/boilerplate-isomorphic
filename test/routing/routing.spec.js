import { assert } from 'chai'

import wire                 from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';
import routingSystemPlugin  from '../../src/server/plugins/routing/crossroads';

describe('routing system',  () => {

    const before = () => {
        wire({
            $plugins: [
                wireDebugPlugin,
                routingSystemPlugin
            ],
            routingSystem: {
                createRouter: {
                    name: 'mainRouter'
                },
                routes: [
                    {route: '/home'         , component: "Home"},
                    {route: '/experiment'   , component: "Experiment"}
                ]
            }
        })
        .then((context) => console.log(context))
        .otherwise((error) => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should have plugin',  () => {
        assert.ok(routingSystemPlugin)
    });
});