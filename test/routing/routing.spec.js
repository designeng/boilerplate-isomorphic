import wire             from 'essential-wire';
import wireDebugPlugin  from 'essential-wire/source/debug';
// import routingSystemPlugin from '../../src/server/plugins/routing';

console.log(__dirname);

describe('routing system',  () => {

    const before = () => {
        wire({
            $plugins: [
                wireDebugPlugin,
                // routingSystemPlugin
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

    it('should match route',  () => {

        // TODO
        // assert.equal(document.querySelector('#app-wrapper').innerHTML, 'Navigation Component');
    });
});