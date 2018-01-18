import React from 'react';
import {Platform, Picker, Styles, AsyncStorage, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, Image, View, Button, TouchableHighlight} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Style as styles } from '../styles/Common';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class Landing extends React.Component {

  static navigationOptions = {
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userStatus: '', //NOT_REGISTERED, REGISTERED, VERIFIED
      authenticated: false,
      userObject: {},
      auth: {}
    };
  }  

  onSignUp = () => {
    this.props.navigator.push({
      screen: 'x.SignUp',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }

  reSignUp = () => {
    try {
      AsyncStorage.removeItem('@GolocoStore:userStatus', (error) => {
        AsyncStorage.removeItem('@GolocoStore:userObject', (error) => {
          this.onSignUp();
        });
      });
    } catch (error) {
      // Error saving data
    }
  }

  startApp = () => {

      Icon.getImageSource('bars', 25).then((barIcon) => {
      Icon.getImageSource('home', 25).then((homeIcon) => {
      Icon.getImageSource('bars', 25).then((accountsIcon) => {
      Icon.getImageSource('qrcode', 25).then((qrIcon) => {
      Icon.getImageSource('address-book', 25).then((tabsIcon) => {
      Icon.getImageSource('map-marker', 25).then((placesIcon) => {
      Icon.getImageSource('ticket', 25).then((passesIcon) => {

              const navigatorStyle = {
                navBarButtonColor: '#eee',
                navBarBackgroundColor: '#3f51b5',
                navBarTextColor:'#eee',
                topBarElevationShadowEnabled: true,
                statusBarTextColorScheme: 'light',
                //statusBarHidden:true
              }

              const navigatorButtons = {
                leftButtons: [{
                  icon: barIcon,
                  id: 'sideMenu'
                }]
              };

              const tabs = [{
                label: 'PLACES',
                screen: 'x.Places',
                icon: placesIcon,
                title: 'PLACES',
                navigatorButtons: navigatorButtons,
                navigatorStyle: navigatorStyle
              }, {
                label: 'PASSES',
                screen: 'x.Passes',
                icon: passesIcon,
                title: 'PASSES',
                navigatorButtons: navigatorButtons,
                navigatorStyle: navigatorStyle
              }, {
                label: 'TABS',
                screen: 'x.Tabs',
                icon: tabsIcon,
                title: 'TABS',
                navigatorButtons: navigatorButtons,
                navigatorStyle: navigatorStyle
              }];

              Navigation.startTabBasedApp({
                tabs,
                passProps : {
                  user: this.state.userObject,
                  auth: this.state.auth
                },
                animationType: Platform.OS === 'ios' ? 'fade' : 'fade',
                tabsStyle: {
                  initialTabIndex: 1,
                  tabBarBackgroundColor: '#eee',
                  tabBarSelectedButtonColor: '#3f51b5',
                  tabBarButtonColor: '#aaa'
                },
                appStyle: {
                  backgroundColor: '#ddd',
                  hideBackButtonTitle: true
                },
                drawer: {
                  disableOpenGesture: true,
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

  componentDidMount() {
    this.setState({loading: true});
    try {
      AsyncStorage.getItem('@GolocoStore:userObject', (error, user) => {
          if (!user) {
            this.setState({
              userStatus: 'NOT_REGISTERED',
              loading: false,
            });
            return false;
          }

          this.setState({userObject: JSON.parse(user)});

          const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/oauth/token?username=' + encodeURIComponent(this.state.userObject.username) + '&password=' + encodeURIComponent(this.state.userObject.password) + '&grant_type=password&client_id=goloco&client_secret=gocrazy';
          fetch(url, {
            method: 'POST'
          })
          .then(res => res.json())
          .then(res => {
            if(res.access_token) {
              this.setState({
                auth: res,
                loading: false,
                userStatus: 'VERIFIED'
              }, () => {this.startApp()})
            } else {
              this.setState({
                userStatus: 'REGISTERED',
                loading: false
              });
            }
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });

      });      

    } catch (error) {
      // Error saving data
    }
  }

  render() {
    return (
        <View style={{backgroundColor: '#3f51b5', width:'100%', flex:1, paddingHorizontal:40, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>

          <View style={{alignItems:'center', width:'100%', marginTop:140}}>
            <Image style={{width:600, height:200}} resizeMode={'contain'} source={require('../../img/goloco-landing.png')} />
          </View>

          { (this.state.userStatus == 'NOT_REGISTERED') &&
            <View style={{width:'100%'}}>
              <TouchableOpacity onPress={this.onSignUp} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'#fafafa', marginTop:50, height:50}]}>
                <Text style={{color:'#333', fontSize:14, fontWeight: '600'}}>Request Invite</Text>
              </TouchableOpacity>
            </View>
          }

          { (this.state.userStatus == 'REGISTERED') &&
            <View style={{width:'100%', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
              <Text style={{color:'#eee', fontSize:18, fontWeight: '600'}}>Hello {this.state.userObject.name}!</Text>
              <Text style={{color:'#eee', fontSize:14, fontWeight: '600'}}>Your request is pending for approval</Text>
            </View>
          }

          { this.state.loading &&
            <View style={{width:'100%', height:50, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                  <ActivityIndicator animating size="large" />
            </View>
          }

          <View style={{width:'100%', height:60, paddingVertical:20, alignItems: 'center', justifyContent:'flex-end'}}>
            <Text style={{fontSize: 10, color:'#7b88d1'}}>Goloco | v1.0.0 beta</Text>
          </View>
        </View>


    );
  }
}

//onLogin();
