import React from 'react';
import {StyleSheet,ScrollView, Animated,TouchableOpacity, Image, Dimensions, View, FlatList,SectionList, ActivityIndicator, TouchableHighlight,TextInput, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style as styles } from '../styles/Common';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PercentageCircle from 'react-native-percentage-circle';
import ProgressCircle from 'react-native-progress-circle';

const { width, height } = Dimensions.get('window');

const AnimatedProgressCircle = Animated.createAnimatedComponent(ProgressCircle);
const SHOW_CODE_DURATION = 20000;
const GENERATE_BUTTON_HOLD_DURATION = 1000;


class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offerAvailStatus: 'NOT_AVAILED',
      pressAnimationValue: new Animated.Value(0),
      showCodeAnimationValue: new Animated.Value(0),
    }

    this.props.navigator.toggleNavBar({to: 'hidden', animated: false});
    this.props.navigator.setStyle({statusBarHidden: true});
  }

  showErrorMessage = (message, title) => {
    this.props.navigator.showInAppNotification({
     screen: "x.Notification",
     passProps: {
        style: 'ERROR',
        message: title ? title : "Something's Wrong",
        subMessage: message,
        icon: 'warning',
        buttons: []
     },
     autoDismissTimerSec: 5
    });
  }

  startCodeShowTimer = () => {
    Animated.timing(this.state.pressAnimationValue, {
        duration: SHOW_CODE_DURATION,
        toValue: 0
    }).start(() => {
      if (this.state.pressAnimationValue._value==0) {
        this.setState({
          availButtonPressed: true,
          offerAvailStatus: 'AVAILED'
        });
      }
    });
  }

  generateOfferCode = () => {
          this.setState({loading: true});
          //alert(JSON.stringify(this.props.offerObj));
          //return;
          const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/event/availoffer?offerId=' + this.props.offerObj.id;
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.auth.access_token
            }            
          })
          .then(res => res.json())
          .then(res => {
            //alert(JSON.stringify(res));
            if(res.hasError) {
              this.setState({
                loading: false
              });
              this.showErrorMessage('Offer could not be availed.');
            }
            else {
              this.setState({
                loading: false
              });
              if (res.model.userAvailedOffer.offerCode) {
                this.setState({
                  offerAvailStatus: 'CODE_GENERATED',
                  offerCode: res.model.userAvailedOffer.offerCode
                });
                this.startCodeShowTimer();

              } else {
                this.setState({
                  offerAvailStatus: 'AVAILED',
                });
              }
            }
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
  }

  handleAvailButtonPressIn = () => {
    !this.state.availButtonPressed && this.state.offerAvailStatus=='NOT_AVAILED' && Animated.timing(this.state.pressAnimationValue, {
    //Animated.timing(this.state.pressAnimationValue, {
        duration: GENERATE_BUTTON_HOLD_DURATION,
        toValue: 100
    }).start(() => {
      if (this.state.pressAnimationValue._value==100) {
        this.setState({availButtonPressed: true});
        this.generateOfferCode();
      }
    });
  }

  handleAvailButtonPressOut = () => {
    !this.state.availButtonPressed &&
    Animated.timing(this.state.pressAnimationValue, {
        duration: GENERATE_BUTTON_HOLD_DURATION/2,
        toValue: 0
    }).start();
  }

  componentDidMount() {
    //alert(JSON.stringify(this.props.offerObj))
    this.setState({offerAvailStatus: this.props.offerObj.status})
  }

  render() {
    return (
      <View style={{width: width, height: height, paddingVertical: 40, paddingHorizontal: 20, backgroundColor: '#db4437', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>

        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginTop: 0, borderBottomWidth:2, borderColor: '#ffffffaa', paddingVertical:5, flexDirection:'column', alignItems:'center'}}>
            <Text style={{fontSize: 22, fontWeight:'800', color:'#ffffffaa'}}>{this.props.offerObj.offerName}</Text>
          </View>
          <Text style={{marginTop:5, fontSize: 14, fontWeight:'700', color:'#ffffffaa'}}>{this.props.offerObj.eventName}</Text>
        </View>

        <AnimatedProgressCircle percent={this.state.pressAnimationValue} radius={70} borderWidth={6} color="#fae6e4" shadowColor="#f3c0bc" bgColor="#db4437">
              <TouchableOpacity onPressIn={this.handleAvailButtonPressIn} onPressOut={this.handleAvailButtonPressOut} activeOpacity={0.9} style={[{padding:20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position:'absolute', top:0, bottom:0, left:0, right:0}]}>
                { this.state.offerAvailStatus == 'NOT_AVAILED' &&
                <Text style={styles.circularButtonText}>TAP & HOLD TO AVAIL OFFER</Text>
                }
                { this.state.offerAvailStatus == 'AVAILED' &&
                <Text style={styles.circularButtonText}>OFFER AVAILED</Text>
                }
                { this.state.offerAvailStatus == 'CODE_GENERATED' &&
                <Text style={[styles.circularButtonText, {fontSize: 20}]}>{this.state.offerCode}</Text>
                }
              </TouchableOpacity>
        </AnimatedProgressCircle>


        <TouchableOpacity onPress={this.props.navigator.dismissLightBox} activeOpacity={0.7} style={[styles.roundedButton, {}]}>
          { this.state.offerAvailStatus == 'NOT_AVAILED' &&
          <Text style={styles.circularButtonText}>NAY, LATER</Text>
          }
          { this.state.offerAvailStatus != 'NOT_AVAILED' &&
          <Text style={styles.circularButtonText}>CLOSE</Text>
          }
        </TouchableOpacity>

        { this.state.loading && 
          <View style={styles.loadingMaskDark}>
                <ActivityIndicator animating size="large" />
          </View>
        }        

      </View>
    );
  }
}


export default MyClass;