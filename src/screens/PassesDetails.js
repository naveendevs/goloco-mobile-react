import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PassesItem from '../components/PassesItem';
import { Style as styles } from '../styles/Common';

const { width } = Dimensions.get('window');

class MyClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fullScreenLoading : false,

      isPassStatusCheckedIn: false,
      isPassStatusBillUploaded: false,

      placeDetailsLoading : false,
      placeDetailsData : {}
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
        content: this.props.selectedPlace.golocoEvent.terms,
        closeAction: this.props.navigator.dismissLightBox
      },
      style: {
        backgroundBlur: "none",
        backgroundColor: "#000000aa",
        tapBackgroundToDismiss: true
      }
    });
  };

  doCheckIn = () => {
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/event/checkin?golocoEventId=' + this.props.selectedPlace.golocoEvent.id;
    this.setState({ fullScreenLoading: true });
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.access_token
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ fullScreenLoading: false });
      console.log('---------------checkin');
      console.log(res);
    })
    .catch(error => {
      this.setState({ fullScreenLoading: false });
    });
  }

  doAvailOffer = () => {
  }

  doUploadBill = () => {
    this.props.navigator.showModal({
      screen: 'x.CameraView',
      passProps: {
        gatePass: this.props.selectedPlace,
        auth: this.props.auth,
        uploadCallback: this.doPostUploadBill
      }
    });
  }

  doPostUploadBill = (url) => {
    this.setState({
      isPassStatusBillUploaded: true,
      billURL: url
    })
  }

  componentDidMount() {
    //if (this.props.selectedPlace.id != this.state.placeDetailsData.id) {
      //TODO: call if details are to be fetched from server
      //this.loadPlaceDetailsData(this.props.selectedPlace.placeId);
    //}
    
    this.setState({
      isPassStatusCheckedIn: (this.props.selectedPlace.status == 'CHECKED_IN'),
      isPassStatusBillUploaded: this.props.selectedPlace.billUploaded,
      billURL: this.props.selectedPlace.billImageUrl
    })

  }

  closeModal = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    return (

      <View style={{flex:1}}>
        
        <ScrollView contentContainerStyle={{flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        
          <View style={{height:200, width: '100%'}}>
            <Image style={{width:'100%', height: 200}} source={{uri: this.props.selectedPlace.golocoEvent.imageUrl}} />
            <View style={{position:'absolute', bottom:0, left:0, right:0, height:2,  backgroundColor:'#fff', shadowColor : '#000', shadowOpacity : 1,shadowRadius : 10,shadowOffset: {width: 0,height:-25}}}/>
            <Text style={{position:'absolute', bottom:10, left:19, backgroundColor:'transparent', color: '#fff', fontSize: 18, fontWeight: '700'}}>
              {this.props.selectedPlace.golocoEvent.name}
            </Text>
            <Icon onPress={this.closeModal} name='close' style={{position:'absolute', top:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 32, fontWeight: '700'}}/>
            <Text onPress={this.showTermsAndConditions} style={{position:'absolute', bottom:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 10, fontWeight: '500', backgroundColor:'orange', paddingVertical:6, paddingHorizontal:10}}>Read T&C</Text>
          </View>
            
          { this.props.selectedPlace.golocoEvent.golocoOffers && !this.state.isPassStatusCheckedIn && !this.state.isPassStatusBillUploaded && 
          <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='gift' style={{color: '#3f51b5', fontSize: 100, marginTop:30, fontWeight: '700'}}/>
            </View>
            <Text onPress={this.showTermsAndConditions} style={{color: '#7b88d1', textAlign:'center', fontSize: 24, fontWeight: '600', paddingHorizontal:50}}>Check-in to avail exclusive offers</Text>

            <View style={[{width:'100%', flexDirection: 'row', justifyContent:'flex-start', alignItems:'flex-start', marginTop:30}]}>
              <ScrollView style={{height: 80, width: width, paddingHorizontal:20}} horizontal showsHorizontalScrollIndicator={false} snapToAlignment={'end'}>

                {this.props.selectedPlace.golocoEvent.golocoOffers.map((value, key) => {
                    return <View key={value.id} style={[styles.offersBox, {height: 70}]}><Text style={styles.offersText}>{value.offerName}</Text></View>
                })}            

                <View style={[{width:20, backgroundColor:'transparent'}]}>
                </View>
              </ScrollView>
            </View>
          </View>
          }

          { this.state.isPassStatusCheckedIn && !this.state.isPassStatusBillUploaded &&
          <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='check-circle-o' style={{color: '#3f51b5', fontSize: 100, marginTop:30, fontWeight: '700'}}/>
            </View>
            <Text onPress={this.showTermsAndConditions} style={{color: '#7b88d1', textAlign:'center', fontSize: 24, fontWeight: '600', paddingHorizontal:50}}>Checked-in</Text>
            <Text onPress={this.showTermsAndConditions} style={{color: '#7b88d1', textAlign:'center', fontSize: 24, fontWeight: '600', paddingHorizontal:50}}>Select offer to avail</Text>

            <View style={[{width:'100%', flexDirection: 'row', justifyContent:'flex-start', alignItems:'flex-start', marginTop:30}]}>
              <ScrollView style={{height: 80, width: width, paddingHorizontal:20}} horizontal showsHorizontalScrollIndicator={false} snapToAlignment={'end'}>

                {this.props.selectedPlace.golocoEvent.golocoOffers.map((value, key) => {
                    return <View key={value.id} style={[styles.offersBox, {height: 70}]}><Text style={styles.offersText}>{value.offerName}</Text></View>
                })}            

                <View style={[{width:20, backgroundColor:'transparent'}]}>
                </View>
              </ScrollView>
            </View>
          </View>
          }

          { this.state.isPassStatusCheckedIn && this.state.isPassStatusBillUploaded &&
          <View style={{width:'100%', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='check-circle-o' style={{color: '#3f51b5', fontSize: 100, marginTop:30, fontWeight: '700'}}/>
            </View>
            <Text onPress={this.showTermsAndConditions} style={{color: '#7b88d1', textAlign:'center', fontSize: 24, fontWeight: '600'}}>Bill Uploaded</Text>

            <View style={[{width:'100%', flexDirection: 'row', justifyContent:'center', alignItems:'center', marginTop:30}]}>
              <Image style={{width: 120, height: 200, paddingHorizontal: 50}} source={{uri: 'https://s3.ap-south-1.amazonaws.com/goloco-images/invoices/5/12/5.jpg'}} />
            </View>
          </View>
          }

          <View style={styles.verticalSeparatorMedium}></View>
          <View style={styles.verticalSeparatorMedium}></View>
        </ScrollView>

        { !this.state.isPassStatusCheckedIn && !this.state.isPassStatusBillUploaded &&
        <TouchableOpacity activeOpacity={0.7} style={styles.buttonPrimary} onPress={this.doCheckIn}>
            <Text style={{color:'#fff', fontWeight: '700'}}>CHECK IN</Text>
        </TouchableOpacity>
        }

        { this.state.isPassStatusCheckedIn && !this.state.isPassStatusBillUploaded &&
        <TouchableOpacity activeOpacity={0.7} style={styles.buttonPrimary} onPress={this.doUploadBill}>
            <Text style={{color:'#fff', fontWeight: '700'}}>UPLOAD BILL</Text>
        </TouchableOpacity>
        }

        { this.state.isPassStatusCheckedIn && this.state.isPassStatusBillUploaded &&
        <TouchableOpacity activeOpacity={0.7} style={styles.buttonPrimary} onPress={this.closeModal}>
            <Text style={{color:'#fff', fontWeight: '700'}}>CLOSE</Text>
        </TouchableOpacity>
        }
      
      </View>

    );
  }
}

export default MyClass;