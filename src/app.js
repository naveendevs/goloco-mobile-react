import React from 'react';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';
import {Platform, View, Text} from 'react-native';


// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const tabs = [{
}];

Navigation.startSingleScreenApp({
    screen: {
      screen: 'x.Landing',
      navigatorStyle: {
        navBarHidden: true
      }
    }
})
