import React from 'react';
import {Platform, TouchableWithoutFeedback, Keyboard, Picker, Dimensions, AsyncStorage,ActivityIndicator, Styles, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, Image, View, Button, TouchableHighlight} from 'react-native';
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
      signUpHash: '',
      loading: false,
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

  showErrorMessage = (message, title) => {
        this.props.navigator.showInAppNotification({
         screen: "x.Notification",
         passProps: {
            style: 'ERROR',
            message: title ? title : "Something's Wrong",
            subMessage: message,
            icon: 'ticket',
            buttons: [{
              text: 'GOT IT!',
              type: 'primary',
              onPress: function() {
                alert('called');
              }
            }]
         },
         autoDismissTimerSec: 5
        });
  }

  onSignUpSubmit = () => {
    var errorMessage = [];
    if (this.state.signUpInputName.toString().trim() == '') {
      errorMessage.push('Enter you name');
    }
    if (this.state.signUpInputPhone.toString().trim() == '') {
      errorMessage.push('Enter phone number');
    } else if (this.state.signUpInputPhone.toString().trim().length<10){
      errorMessage.push('Enter valid phone number');
    }
    if (this.state.signUpInputEmail.toString().trim() == '') {
      errorMessage.push('Enter email address');
    } else if(!this.state.signUpInputEmail.toString().trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errorMessage.push('Enter valid email address');
    }
    if (errorMessage.length>0) {
      this.showErrorMessage(errorMessage);
      return;
    }

    console.log('register called');
    this.setState({loading: true})
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
        } else {
          this.setState({loading: false})
          this.showErrorMessage("Something went wrong while sending the invite. Please check the entered details and try again.")
        }
      })
      .catch(error => {
        this.setState({loading: false}) 
        this.showErrorMessage("Something went wrong while sending the invite. Please check the entered details and try again.")        
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
          this.setState({
            signUpScrollPosition: 1,
            signUpHash: res.model.hash,
            loading: false,
            signUpInputOTP:'',
          })

          this.refs['_otpInput'].clear();
          this.refs['_otpInput'].focus();
        } else {
          this.showErrorMessage("Something went wrong while generating the verification code. Please check the phone number and try again.")
        }
      })
      .catch(error => {
        this.setState({loading: false}) 
      });
  }
  
  onSignUpVerify = () => {
    this.setState({loading: true})

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
              this.setState({loading: false})
            });
          });
        } catch (error) {
          this.setState({loading: false})
        }

        } else {
          this.setState({loading: false})
          this.showErrorMessage("You seem to have typed the wrong code. Please check the meesage sent to your phone and try again.", "Verification Failed!")          
        }
      })
      .catch(error => {
        this.setState({loading: false})
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

            { false &&
            <View style={{width:'100%', height:40, alignItems: 'center'}}>
              <Text style={{fontSize: 16, color:'#eee', marginTop:10}}>Welcome to</Text>
            </View>
            }

            <Image style={{width:200, height:80}} resizeMode={'contain'} source={require('../../img/logo-horizontal.png')} />
            <Text style={{fontSize: 14, fontWeight:'600', color:'#ffffffaa', marginTop:40}}>SIGN UP</Text>
          </View>

          <ScrollView ref="_signUpView" style={{width: width}} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false}>

          <View style={{width: width, paddingHorizontal: 40, flexDirection:'column', justifyContent:'center'}}>

            { false &&
            <Text style={{fontSize: 14, color:'#eee', marginTop:20, marginBottom:20, textAlign:'center'}}>Enter requested details to proceed</Text>
            }

            <View style={{borderBottomWidth:2, borderColor:'#ffffffaa'}}>
            <TextInput onChangeText={(text) => this.setState({signUpInputName: text})} autoCorrect={false} height={40} placeholder={'Name'} placeholderTextColor={'#ffffff77'} style={[styles.textBox, {fontSize:16, color:'#ffffffee', paddingHorizontal:5, paddingVertical:5, backgroundColor:'transparent'}]}/>
            </View>

            <View style={{borderBottomWidth:2, borderColor:'#ffffffaa', marginTop:15}}>
            <TextInput onChangeText={(text) => this.setState({signUpInputPhone: text})} autoCorrect={false} keyboardType={'phone-pad'} height={40} placeholder={'Phone'} placeholderTextColor={'#ffffff77'} style={[styles.textBox, {fontSize:16, color:'#ffffffee', paddingHorizontal:5, paddingVertical:5, borderBottomWidth:2, borderColor:'#ffffffaa', backgroundColor:'transparent'}]}/>
            </View>
            
            <View style={{borderBottomWidth:2, borderColor:'#ffffffaa', marginTop:15}}>
            <TextInput onChangeText={(text) => this.setState({signUpInputEmail: text})} autoCorrect={false} keyboardType={'email-address'} height={40} placeholder={'Email'} placeholderTextColor={'#ffffff77'} style={[styles.textBox, {fontSize:16, color:'#ffffffee', paddingHorizontal:5, paddingVertical:5, borderBottomWidth:2, borderColor:'#ffffffaa', backgroundColor:'transparent'}]}/>
            </View>

            <TouchableOpacity onPress={this.onSignUpSubmit} activeOpacity={0.7} style={[styles.buttonPrimary, {borderRadius:5, backgroundColor:'#ffffffee', marginTop:50, height:50}]}>
              <Text style={{color:'#333', fontWeight: '700'}}>PROCEED</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToLanding} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'transparent', marginTop:10, height:50}]}>
              <Text style={{color:'#ffffffaa', fontWeight: '700'}}>BACK</Text>
            </TouchableOpacity>

          </View>

          <View style={{width: width, paddingHorizontal: 40, flexDirection:'column', justifyContent:'center'}}>
            <Text style={{fontSize: 14, color:'#ffffffaa', marginTop:30, marginBottom:5, textAlign:'center'}}>Please enter the verification code sent to {this.state.signUpInputPhone}</Text>

            <TextInput ref="_otpInput" onChangeText={(text) => {this.setState({signUpInputOTP: text}); (text.length>3) && Keyboard.dismiss()}} autoCorrect={false} maxLength={4} keyboardType={'numeric'} style={{position: 'absolute', display:'none'}} />

            <TouchableWithoutFeedback onPress={()=>this.refs['_otpInput'].focus()}>
            <View style={{marginTop:60,flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <View style={{borderBottomWidth:2, borderColor:'#ffffffcc', marginHorizontal:8}}>
              <Text style={{width:40, height:40, fontSize:26, fontWeight:'600', textAlign:'center', backgroundColor:'transparent', color:'#ffffffaa'}}>{this.state.signUpInputOTP.toString().charAt(0)}</Text>
            </View>
            <View style={{borderBottomWidth:2, borderColor:'#ffffffcc', marginHorizontal:8}}>
              <Text style={{width:40, height:40, fontSize:26, fontWeight:'600', textAlign:'center', backgroundColor:'transparent', color:'#ffffffaa'}}>{this.state.signUpInputOTP.toString().charAt(1)}</Text>
            </View>
            <View style={{borderBottomWidth:2, borderColor:'#ffffffcc', marginHorizontal:8}}>
              <Text style={{width:40, height:40, fontSize:26, fontWeight:'600', textAlign:'center', backgroundColor:'transparent', color:'#ffffffaa'}}>{this.state.signUpInputOTP.toString().charAt(2)}</Text>
            </View>
            <View style={{borderBottomWidth:2, borderColor:'#ffffffcc', marginHorizontal:8}}>
              <Text style={{width:40, height:40, fontSize:26, fontWeight:'600', textAlign:'center', backgroundColor:'transparent', color:'#ffffffaa'}}>{this.state.signUpInputOTP.toString().charAt(3)}</Text>
            </View>
            </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity disabled={this.state.signUpInputOTP.length<4} onPress={this.onSignUpVerify} activeOpacity={0.7} style={[styles.buttonPrimary, {borderRadius:5, backgroundColor:'#ffffffee', marginTop:50, height:50}]}>
              <Text style={{color:'#333', fontWeight: '700'}}>VERIFY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showSignUpForm} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'transparent', marginTop:10, height:50}]}>
              <Text style={{color:'#ffffffaa', fontWeight: '700'}}>BACK</Text>
            </TouchableOpacity>

          </View>

          <View style={{width: width, paddingHorizontal: 40, flexDirection:'column', justifyContent:'center'}}>

            <View >
            <Text style={{color:'#ffffffcc', fontSize:18, textAlign:'center', fontWeight: '600'}}>Hurray {this.state.signUpInputName}!</Text>
            <Text style={{color:'#ffffffcc', fontSize:14, textAlign:'center', fontWeight: '600', marginTop:5}}>Your invite request has been sent and is pending for approval</Text>
            <Text style={{color:'#ffffffcc', fontSize:14, textAlign:'center', fontWeight: '600', marginTop:5}}>We'll notify you once your request is approved</Text>
            </View>

            <TouchableOpacity onPress={this.navigateToLanding} activeOpacity={0.7} style={[styles.buttonPrimary, {borderRadius:5, backgroundColor:'#ffffffee', marginTop:50, height:50}]}>
              <Text style={{color:'#333', fontWeight: '700'}}>OKAY!</Text>
            </TouchableOpacity>
          </View>

          </ScrollView>

          <View style={{width:'100%', paddingVertical:20, alignItems: 'center', justifyContent:'flex-end'}}>
            <Text style={{fontSize: 10, color:'#7b88d1'}}>Goloco | v1.0.0 beta</Text>
          </View>

          { this.state.loading && 
            <View style={styles.loadingMaskDark}>
                  <ActivityIndicator animating size="large" />
            </View>
          }

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
