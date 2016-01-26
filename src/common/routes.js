import { Route } from "react-router";
import React from "react";

import App from "./containers/App";
/**/

//Redux Dumb
import HomePage         from "./components/Home";
import ExperimentsPage  from "./components/Experiments";
import error404         from "./components/404";

export default (
    <Route name="app" path="/" component={App}>
        <Route path="home" component={HomePage}/>
        <Route path="experiments" component={ExperimentsPage}/>
        <Route path="*" component={error404}/>
    </Route>
);

