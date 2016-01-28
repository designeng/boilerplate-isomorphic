import wire from 'essential-wire';
import routingSystemPlugin from '../../server/plugins/routing';

describe('routing system',  () => {

    const before = () => {
        wire({
            $plugins: [
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
    }

    beforeEach(before);

    it('should match route',  () => {
        ReactDom.render(<Application />, root._rootElement);

        // TODO
        // assert.equal(document.querySelector('#app-wrapper').innerHTML, 'Navigation Component');
    });
});