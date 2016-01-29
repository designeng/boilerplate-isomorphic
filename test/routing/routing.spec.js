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
    function getUserFactory(resolver, compDef, wire){
        let promise = compDef.options;
        when(promise).then((result) => resolver.resolve(result));
    }

    return {
        factories: {
            getUser: getUserFactory
        }
    }
}

const isAuthorisedPlugin = (options) => {
    const isAuthorised = (resolver, compDef, wire) => {
        wire(compDef.options).then((options) => {
            const user = options.user;
            resolver.resolve(!!user && !!user.name);
        });
    }

    return {
        factories: {
            isAuthorised
        }
    }
}

describe('user info - authorisation',  () => {

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
                isAuthorisedPlugin
            ],

            user: {
                getUser: getUserPromise
            },

            authorised: {
                isAuthorised: {
                    user: {$ref: 'user'}
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

    it('user.name should be not-empty string',  (done) => {
        expect(rootContext.user.name).to.equal('John');
        done();
    });

    it('context member should be ok',  (done) => {
        expect(rootContext.user.name).to.equal('John');
        done();
    });

    it('authorised context member should be ok',  (done) => {
        expect(rootContext.authorised).to.be.ok;
        done();
    });

    it('user should be authorised',  (done) => {
        expect(rootContext.authorised).to.equal(true);
        done();
    });

});

describe('user info for not authorised user',  () => {

    let rootContext = {};

    const getUserPromise = when.promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null)
        }, 100);
    });

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin,
                getUserPlugin,
                isAuthorisedPlugin
            ],

            user: {
                getUser: getUserPromise
            },

            authorised: {
                isAuthorised: {
                    user: {$ref: 'user'}
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

    it('user should not be authorised (user = null)',  (done) => {
        expect(rootContext.authorised).to.equal(false);
        done();
    });

});