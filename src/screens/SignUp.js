import React from 'react';
import {Platform, Picker, Dimensions, AsyncStorage, Styles, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, Image, View, Button, TouchableHighlight} from 'react-native';
//import { TextField } from 'react-native-material-textfield';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Style as styles } from '../styles/Common';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
const { width, height } = Dimensions.get('window');

export default class Landing extends React.Component {

  static navigationOptions = {
  }

  constructor(props) {
    super(props);
    this.state = {
      signUpScrollPosition: 1,
      signUpInputName: '',
      signUpInputEmail: '',
      signUpInputPhone: '',
      signUpInputOTP: '',
      signUpHash: ''
    }
  }

  navigateToLanding = () => {
    this.props.navigator.resetTo({
      screen: 'x.Landing',
      navigatorStyle: {
        navBarHidden: true
      },
      animationType: 'fade'
    });
  };

  onSignUpSubmit = () => {
    console.log('register called');
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/invite/registerinvite';
    //this.setState({ placeDetailsLoading: true });
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.signUpInputName,
        emailId: this.state.signUpInputEmail,
        phoneNumber: this.state.signUpInputPhone,
        selfieImageUrl: this.state.signUpInputName
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.hasError) {
          this.generateOTP();
        }
      })
      .catch(error => {
        //this.setState({ error, placeDetailsLoading: false });
      });
  };

  generateOTP = () => {
    console.log('generating OTP');
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/invite/sendverificationcode?phoneNumber='+ this.state.signUpInputPhone +'&countryCode=91';
    //this.setState({ placeDetailsLoading: true });
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.hasError && res.model.hash) {
          console.log('sent code')
          this.refs._signUpView.scrollTo({x: (1)*width});
          this.setState({signUpScrollPosition: 1})
          this.setState({signUpHash: res.model.hash})
        }
      })
      .catch(error => {
        //this.setState({ error, placeDetailsLoading: false });
      });
  }
  
  onSignUpVerify = () => {
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/invite/verifycode';
    //this.setState({ placeDetailsLoading: true });
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hash: this.state.signUpHash,
        otpCode: this.state.signUpInputOTP,
        name: this.state.signUpInputName,
        emailId: this.state.signUpInputEmail,
        phoneNumber: this.state.signUpHash,
        selfieImageUrl: this.state.signUpInputName
      })

    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.hasError && res.model.isValidated) {

        try {
          AsyncStorage.setItem('@GolocoStore:userStatus', 'REGISTERED', (error) => {
            AsyncStorage.setItem('@GolocoStore:userObject', JSON.stringify(res.model.user), (error) => {
              this.refs._signUpView.scrollTo({x: (2)*width});
              this.setState({signUpScrollPosition: 2});
            });
          });
        } catch (error) {
          // Error saving data
        }

        }
      })
      .catch(error => {
        //this.setState({ error, placeDetailsLoading: false });
      });
  };

  showSignUpForm = () => {
    this.refs._signUpView.scrollTo({x: (0)*width});
    this.setState({signUpScrollPosition: 0})
  };

  render() {
    return (
        <View style={{backgroundColor:'#3f51b5', width:'100%', flex:1, paddingHorizontal:40, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>

          <View style={{alignItems:'center', width:'100%', marginTop:50}}>
            <View style={{width:'100%', height:40, alignItems: 'center'}}>
              <Text style={{fontSize: 16, color:'#eee', marginTop:10}}>Welcome to</Text>
            </View>
            <Image style={{width:200, height:80}} resizeMode={'contain'} source={require('../../img/logo-horizontal.png')} />
            <Text style={{fontSize: 12, color:'#eee', marginTop:10}}>We are happy to have you onboard</Text>
          </View>

          <ScrollView ref="_signUpView" style={{width: width}} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false}>

          <View style={{width: width, paddingHorizontal: 40}}>
            <Text style={{fontSize: 14, color:'#eee', marginTop:20, marginBottom:20, textAlign:'center'}}>Enter requested details to proceed</Text>
            <TextInput onChangeText={(text) => this.setState({signUpInputName: text})} height={40} placeholder={'Your Name'} placeholderTextColor={'#fff'} style={[styles.textBox, {backgroundColor:'#a1abdd', fontSize:14, color:'#fff', paddingHorizontal:10, paddingVertical:6}]}/>
            <TextInput onChangeText={(text) => this.setState({signUpInputPhone: text})} height={40} placeholder={'Phone'} placeholderTextColor={'#fff'} style={[styles.textBox, {marginTop:10, backgroundColor:'#a1abdd', fontSize:14, color:'#fff', paddingHorizontal:10, paddingVertical:6}]}/>
            <TextInput onChangeText={(text) => this.setState({signUpInputEmail: text})} height={40} placeholder={'Email'} placeholderTextColor={'#fff'} style={[styles.textBox, {marginTop:10, backgroundColor:'#a1abdd', fontSize:14, color:'#fff', paddingHorizontal:10, paddingVertical:6}]}/>

            <TouchableOpacity onPress={this.onSignUpSubmit} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'#fafafa', marginTop:10, height:50}]}>
              <Text style={{color:'#333', fontWeight: '700'}}>PROCEED</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToLanding} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'transparent', marginTop:10, height:50}]}>
              <Text style={{color:'#eee', fontWeight: '700'}}>BACK</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: width, paddingHorizontal: 50}}>
            <Text style={{fontSize: 14, color:'#eee', marginTop:10, marginBottom:5, textAlign:'center'}}>Enter OTP</Text>
            <TextInput onChangeText={(text) => this.setState({signUpInputOTP: text})} height={40} placeholder={'OTP'} style={{fontSize:14, color:'#333', borderWidth: 1, borderRadius: 4, borderColor:'#ddd', paddingHorizontal:10, paddingVertical:6}}/>

            <TouchableOpacity onPress={this.onSignUpVerify} activeOpacity={0.7} style={[styles.buttonPrimary, {marginTop:10, height:40}]}>
              <Text style={{color:'#fff', fontWeight: '700'}}>VERIFY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showSignUpForm} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'transparent', marginTop:10, height:40}]}>
              <Text style={{color:'#333', fontWeight: '700'}}>BACK</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: width, paddingHorizontal: 50}}>
            <Text style={{fontSize: 14, color:'#888', marginTop:10, marginBottom:5, textAlign:'center'}}>OTP Verified</Text>

            <TouchableOpacity onPress={this.navigateToLanding} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'orange', marginTop:10, height:40}]}>
              <Text style={{color:'#333', fontWeight: '700'}}>OK</Text>
            </TouchableOpacity>
          </View>

          </ScrollView>

          <View style={{width:'100%', height:60, paddingVertical:20, alignItems: 'center', justifyContent:'flex-end'}}>
            <Text style={{fontSize: 10, color:'#7b88d1'}}>Goloco | v1.0.0 beta</Text>
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
