import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../client/reducers';
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {Login, Register, Main, App} from '../client/containers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <Router> 
        <Route path="/" component={App}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/Main" component={Main} />
      </Router>
    </Provider>,
    document.getElementById('root')
);

module.hot.accept();
