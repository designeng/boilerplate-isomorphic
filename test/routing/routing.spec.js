import chai, { expect } from 'chai';
import spies from 'chai-spies';

import wire                 from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';
import routingSystemPlugin  from '../../src/server/plugins/routing/crossroads';

chai.use(spies);

describe('routing system',  () => {

    let rootContext = {};

    const experimentPageHandlerSpy    = chai.spy();
    const homePageHandlerSpy          = chai.spy();

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
                        {   
                            route: '/home'         , 
                            component: "Home",
                            handler: homePageHandlerSpy
                        },
                        {   
                            route: '/experiment'   , 
                            component: "Experiment", 
                            handler: experimentPageHandlerSpy
                        }
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
        expect(rootContext.routingSystem).to.be.ok;
        done();
    });

    it('should match route',  (done) => {
        const routingSystem = rootContext.routingSystem;
        routingSystem.parse('/experiment');
        expect(experimentPageHandlerSpy).to.have.been.called();
        routingSystem.parse('/home');
        expect(homePageHandlerSpy).to.have.been.called();
        done();
    });
});