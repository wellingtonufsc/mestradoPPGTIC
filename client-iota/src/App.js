import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import IotaListener from './iota/pages/IotaListener';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={IotaListener} />
    </BrowserRouter>
  );
}

export default App;
