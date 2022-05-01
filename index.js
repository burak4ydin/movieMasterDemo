import {AppRegistry, View} from 'react-native';
import React, {useEffect} from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Main from "./src/router";
import configureStore from './src/redux/configureStore';

import store from './src/redux/configureStore'

const RNRedux = (props) => {

    return (

        <Provider store = { store }>


            <Main />

        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => RNRedux);
