require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers/reducers'
import App from './components/app'

const logger = createLogger();
const store = createStore(Reducer, applyMiddleware(logger));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

/*
window.onload = function(){

    window.addEventListener("load", addTimeStamp);

    function addTimeStamp(){
        // add timestamp
        var timestamp = new Date().getTime();
        document.getElementById("timestamp").value = timestamp;
    }    
}
*/