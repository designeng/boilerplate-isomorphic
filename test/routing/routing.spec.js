import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

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


const getUserPlugin = (options) => {
    getUserFactory = (resolver, compDef, wire) => {
        let promise = compDef.options;
        when(promise).then((result) => resolver.resolve(result));
    }

    return {
        factories: {
            getUser: getUserFactory
        }
    }
}

// const isAuthorisedPlugin = (options) => {
//     isAuthorised = (resolver, compDef, wire) => {
//         wire(compDef.options).then((options) => {
//             const user = options.user;
//             resolver.resolve(!!user);
//         });
//     }

//     return {
//         factories: {
//             isAuthorised
//         }
//     }
// }

describe('user info show be integrated into expressRoutingMiddleware',  () => {

    let rootContext = {};

    // probably it should be promise in common case
    const getUserPromise = when.promise((resolve, reject) => {
        setTimeout(() => {
            resolve({name: 'John'})
        }, 100);
    });

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin,
                getUserPlugin,
                // isAuthorisedPlugin
            ],

            user: {
                getUser: getUserPromise
            },

            // isAuthorised: {
            //     user: {$ref: 'user'}
            // }
        })
        .then((context) => {
            rootContext = context;
            done();
        })
        .otherwise((error) => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('comtext member should be ok',  (done) => {
        expect(rootContext.user).to.be.ok;
        done();
    });

    it('comtext member should be ok',  (done) => {
        expect(rootContext.user.name).to.equal('John');
        done();
    });

});