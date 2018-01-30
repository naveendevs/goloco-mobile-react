import React from 'react';
import { StyleSheet, Animated, Image, TouchableOpacity, ScrollView, View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PassesItem from '../components/PassesItem';
import { Style as styles } from '../styles/Common';

const { width } = Dimensions.get('window');

class MyClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      placeDetailsLoading : false,
      placeDetailsData : {},
      animValue: new Animated.Value(0)
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    

    this.props.navigator.toggleNavBar({to: 'hidden', animated: false});
    this.props.navigator.setStyle({statusBarHidden: true});

  }

  onNavigatorEvent(event) {
    if (event.id === 'sideMenu') {
      this.toggleContextMenu();
    }
  }

  toggleContextMenu = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  };

  showTermsAndConditions = () => {
    this.props.navigator.showLightBox({
      screen: 'x.Places.TermsAndConditions',
      passProps: {
        title: 'Terms & Conditions',
        content: this.props.selectedPlace.terms,
        closeAction: this.props.navigator.dismissLightBox
      },
      style: {
        backgroundBlur: "none",
        backgroundColor: "#000000aa",
        tapBackgroundToDismiss: true
      }
    });
  };

  showOfferDetails = (offerObj) => {
    this.props.navigator.showLightBox({
      screen: 'x.LightBox',
      passProps: {
        title: offerObj.offerName,
        content: offerObj.offerDetails,
        closeAction: this.props.navigator.dismissLightBox
      },
      style: {
        backgroundBlur: "none",
        backgroundColor: "#000000aa",
        tapBackgroundToDismiss: true
      }
    });
  }



  getGatePass = () => {
    this.setState({placeDetailsLoading: true});
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/event/generatepass?golocoEventId=' + this.props.selectedPlace.id;
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
        this.setState({placeDetailsLoading: false});
        if (res.hasError) {
          return;
        }

        this.props.navigator.dismissModal();
        this.props.navigator.showInAppNotification({
         screen: "x.Notification",
         passProps: {
            style: 'INFO',
            message: 'Gate Pass Generated!',
            subMessage: 'Your gate pass to event ' + this.props.selectedPlace.name + ' has been generated. See you there. :)',
            icon: 'ticket',
            buttons: [{
              text: 'VIEW PASS',
              type: 'primary',
              onPress: function() {
                alert('called');
              }
            }]
         },
         autoDismissTimerSec: 5
        });

      })
      .catch(error => {
        this.setState({placeDetailsLoading: false});        
      });
  };

  loadPlaceDetailsData = (placeId) => {
    const url = 'https://reactec.getsandbox.com/places/'+ placeId;
    this.setState({ placeDetailsLoading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.musicText = res.music.join(", ");
        res.drinksText = res.drinks.join(", ");
        res.cuisinesText = res.cuisines.join(", ");
        this.setState({
          placeDetailsLoading: false,
          placeDetailsData: res
        });
      })
      .catch(error => {
        this.setState({ error, placeDetailsLoading: false });
      });
  }

  componentDidMount() {
    //if (this.props.selectedPlace.id != this.state.placeDetailsData.id) {
      //TODO: call if details are to be fetched from server
      //this.loadPlaceDetailsData(this.props.selectedPlace.placeId);
    //}

  }

  closeModal = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    return (

      <View style={{flex:1}}>
        
        <ScrollView contentContainerStyle={{flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        
          <View style={{height:280, width: '100%'}}>
            <Image style={{width:'100%', height: 280}} source={{uri: this.props.selectedPlace.imageUrl}} />
            <View style={{position:'absolute', bottom:0, left:0, right:0, height:2,  backgroundColor:'#fff', shadowColor : '#000', shadowOpacity : 1,shadowRadius : 10,shadowOffset: {width: 0,height:-25}}}/>
            <Text style={{position:'absolute', bottom:10, left:19, backgroundColor:'transparent', color: '#fff', fontSize: 18, fontWeight: '700'}}>
              {this.props.selectedPlace.name}
            </Text>
            <Icon onPress={this.closeModal} name='close' style={{position:'absolute', top:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 32, fontWeight: '700'}}/>
            <Text onPress={this.showTermsAndConditions} style={{position:'absolute', bottom:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 10, fontWeight: '500', backgroundColor:'orange', paddingVertical:6, paddingHorizontal:10}}>Read T&C</Text>
          </View>
          
          <View style={{paddingVertical: 5, width:'100%', padding:20, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>

            <View style={styles.verticalSeparatorMedium}/>
            <View style={styles.verticalSeparatorSmall}/>

            <View style={styles.detailsRowContainer}>
              <Icon style={styles.detailsRowIcon} name='map-marker'/>
              <Text style={styles.detailsRowText}>{this.props.selectedPlace.golocoLocation.address}</Text>
            </View>
            
            <View style={styles.verticalSeparatorMedium}/>
            <View style={styles.verticalSeparatorSmall}/>

            <View style={styles.detailsRowContainer}>
              <Icon style={styles.detailsRowIcon} name='music'/>
              <Text style={styles.detailsRowText}>{this.props.selectedPlace.golocoLocation.music}</Text>
            </View>
            
            <View style={styles.verticalSeparatorMedium}/>
            <View style={styles.verticalSeparatorSmall}/>

            <View style={styles.detailsRowContainer}>
              <Icon style={styles.detailsRowIcon} name='cutlery'/>
              <Text style={styles.detailsRowText}>{this.props.selectedPlace.cuisine}</Text>
            </View>
            
            <View style={styles.verticalSeparatorMedium}/>
            <View style={styles.verticalSeparatorSmall}/>

            <View style={styles.detailsRowContainer}>
              <Icon style={styles.detailsRowIcon} name='beer'/>
              <Text style={styles.detailsRowText}>{this.props.selectedPlace.drinks}</Text>
            </View>
            
            <View style={styles.verticalSeparatorMedium}/>
            <View style={styles.verticalSeparatorSmall}/>

            {false &&
            <View style={styles.detailsRowContainer}>
              <Icon style={styles.detailsRowIcon} name='check-circle'/>
              <Text style={styles.detailsRowText}>{this.props.selectedPlace.checkinCount} People have already checked-in</Text>
            </View>
            }

            <View style={styles.verticalSeparatorLarge}></View>

            <View style={styles.detailsRowContainer}>
              <Text style={[styles.detailsRowText, {fontWeight:'600'}]}>Offers</Text>
              <View style={styles.contextMenuItemBadge}>
                  <Text style={styles.contextMenuItemBadgeText}>{this.props.selectedPlace.golocoOffers.length}</Text>
              </View>

            </View>
          </View>

          <View style={styles.verticalSeparatorMedium}></View>

          { this.props.selectedPlace.golocoOffers &&
          <View style={[{width:'100%', flexDirection: 'row', justifyContent:'flex-start', alignItems:'flex-start'}]}>
            <ScrollView style={{height: 80, width: width, paddingHorizontal:20}} horizontal showsHorizontalScrollIndicator={false} snapToAlignment={'end'}>

              {this.props.selectedPlace.golocoOffers.map((value, key) => {
                  return <TouchableOpacity onPress={() => this.showOfferDetails({offerName: value.offerName, offerDetails: value.offerDetails})} key={value.id} style={[styles.offersBox, {height: 70}]}><Text style={styles.offersText}>{value.offerName}</Text></TouchableOpacity>
              })}            

              <View style={[{width:20, backgroundColor:'transparent'}]}>
              </View>
            </ScrollView>
          </View>
          }
          <View style={styles.verticalSeparatorMedium}></View>
          <View style={styles.verticalSeparatorMedium}></View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.7} style={styles.buttonPrimary} onPress={this.getGatePass}>
            <Text style={{color:'#fff', fontWeight: '700'}}>Get Gate Pass</Text>
        </TouchableOpacity>

        { this.state.placeDetailsLoading && 
          <View style={styles.loadingMaskDark}>
                <ActivityIndicator animating size="large" />
          </View>
        }

      </View>

    );
  }
}

export default MyClass;