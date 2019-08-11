import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../client/reducers';
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

import { Login, Register, MainPage, App, SearchPage, MyFeed, MyDirectory } from '../client/containers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/MainPage" component={MainPage} />
      <Route path="/SearchPage" component={SearchPage} />
      <Route path="/MyDirectory/:dir_name" component={MyDirectory} />
      {/* <Switch>
        <Route path="/MyFeed/:name" component={MyFeed} /> */}
      <Route path="/MyFeed" component={MyFeed} />
      {/* </Switch> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();
