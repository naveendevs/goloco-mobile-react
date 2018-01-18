import React from 'react';
import {Platform, Picker, Styles, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, Image, View, Button, TouchableHighlight} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Style as styles } from '../../styles/Common';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class Landing extends React.Component {

  static navigationOptions = {
  }

  constructor(props) {
    super(props)
  }  

  render() {
    return (
        <View style={{width:'100%', flex:1, paddingHorizontal:40, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>

          <View style={{alignItems:'center', width:'100%', marginTop:50}}>
            <View style={{width:'100%', height:40, alignItems: 'center'}}>
              <Text style={{fontSize: 16, color:'#888', marginTop:10}}>Welcome to</Text>
            </View>
            <Image style={{width:200, height:80}} resizeMode={'contain'} source={require('../../../img/logo.png')} />
            <Text style={{fontSize: 12, color:'#888', marginTop:10}}>We are happy to have you onboard</Text>
          </View>

          <View style={{width:'100%'}}>

            <Text style={{fontSize: 14, color:'#888', marginTop:10, marginBottom:5, textAlign:'center'}}>Enter requested details to proceed</Text>
            <TextField label='Your Name' onChangeText={() => {}} inputContainerPadding={2} labelPadding={2} labelHeight={20}/>
            <TextField label='Email' onChangeText={() => {}} inputContainerPadding={2} labelPadding={2} labelHeight={20}/>
            <TextField label='Mobile Number' onChangeText={() => {}} inputContainerPadding={2} labelPadding={2} labelHeight={20} secureTextEntry={true}/>

      <TouchableOpacity onPress={onLogin} activeOpacity={0.7} style={[styles.buttonPrimary, {marginTop:10, height:40}]}>
        <Text style={{color:'#fff', fontWeight: '700'}}>PROCEED</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogin} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'orange', marginTop:10, height:40}]}>
        <Text style={{color:'#fff', fontWeight: '700'}}>REQUEST INVITE</Text>
      </TouchableOpacity>

          </View>

          <View style={{width:'100%', height:60, paddingVertical:20, alignItems: 'center', justifyContent:'flex-end'}}>
            <Text style={{fontSize: 10}}>Goloco | v1.0.0 beta</Text>
          </View>
        </View>


    );
  }
}

function onLogin() {

    Icon.getImageSource('bars', 20).then((barIcon) => {
    Icon.getImageSource('home', 20).then((homeIcon) => {
    Icon.getImageSource('bars', 20).then((accountsIcon) => {
    Icon.getImageSource('qrcode', 20).then((qrIcon) => {
    Icon.getImageSource('address-book', 20).then((tabsIcon) => {
    Icon.getImageSource('map-marker', 20).then((placesIcon) => {
    Icon.getImageSource('ticket', 20).then((passesIcon) => {

            const navigatorStyle = {
              navBarButtonColor: '#222'
            }

            const navigatorButtons = {
              leftButtons: [{
                icon: barIcon,
                id: 'sideMenu'
              }]
            };

            const tabs = [{
              label: 'Places',
              screen: 'x.Places',
              icon: placesIcon,
              title: 'Places',
              navigatorButtons: navigatorButtons,
              navigatorStyle: navigatorStyle
            }, {
              label: 'Passes',
              screen: 'x.Passes',
              icon: passesIcon,
              title: 'Passes',
              navigatorButtons: navigatorButtons,
              navigatorStyle: navigatorStyle
            }, {
              label: 'Tabs',
              screen: 'x.Tabs',
              icon: tabsIcon,
              title: 'Tabs',
              navigatorButtons: navigatorButtons,
              navigatorStyle: navigatorStyle
            }];

            Navigation.startTabBasedApp({
              tabs,
              animationType: Platform.OS === 'ios' ? 'fade' : 'fade',
              tabsStyle: {
                initialTabIndex: 0,
                tabBarBackgroundColor: '#222',
                tabBarSelectedButtonColor: '#fff',
                //tabBarButtonColor: ''
              },
              appStyle: {
                backgroundColor: '#ddd',
                hideBackButtonTitle: true
              },
              drawer: {
                left: {
                  screen: 'x.ContextMenu',
                },
                style: { 
                  drawerShadow: false, 
                  contentOverlayColor: 'rgba(255,255,255,0.75)', // optional, add this if you want a overlay color when drawer is open
                  leftDrawerWidth: 75, // optional, add this if you want a define left drawer width (50=percent)
                  shouldStretchDrawer: false, // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true

                }
              }
            });


        });
        });
        });
        });
        });
        });
    });


}

//onLogin();
