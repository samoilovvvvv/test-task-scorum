import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import { PATHS } from './router/paths';

import Layout from './components/Layout';
import Home from './views/home';
import Auth from './views/auth';

import { needAuth } from './utils/needAuth';

const App = () => (
  <Provider store={store}>
    <Layout>
      <Router>
        <Routes>
          <Route path={PATHS.home} element={needAuth(<Home />)} />
          <Route path={PATHS.login} element={<Auth />} />
        </Routes>
      </Router>
    </Layout>
  </Provider>
);

export default App;