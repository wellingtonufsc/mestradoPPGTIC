import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Header from './shared/UIElements/Header';
import IotaListener from './iota/pages/IotaListener';
import MamListener from './mam/pages/MamListener';
import MamListener2 from './mam/pages/MamListener2';

const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={IotaListener} />
                <Route exact path="/mam" component={MamListener} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;