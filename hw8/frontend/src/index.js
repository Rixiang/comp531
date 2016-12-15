require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers/reducers'
import App from './components/app'

import { initialVisit } from './actions/serverAction'

const logger = createLogger();

//const store = createStore(Reducer, applyMiddleware(logger));
const store = createStore(Reducer, applyMiddleware(thunkMiddleware)); // allow using functions as actions

store.dispatch(initialVisit());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);