import React from 'react';
import { StyleSheet, ScrollView, View, Button, Text, FlatList, ActivityIndicator, SectionList, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import Row from '../components/Row';
import PassesItem from '../components/PassesItem';
import { Style as styles } from '../styles/Common';

const { width } = Dimensions.get('window');

const activityType = {
  TRANSACTION: {
      icon: '',
      iconColor: '',
  },
  DEBIT_ORDER_ADDED: {
      icon: '',
      iconColor: '',
  },
}



class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPayment : null,
      selectedActivity : null,

      activityLiveLoading : false,
      activityLiveData : [],
      activityLiveCurrentPage : 1,
      activityLiveIsLastPage: false
    };
    this.handlePaymentAction = this.handlePaymentAction.bind(this);
    this.handleActivityAction = this.handleActivityAction.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    
  }

  onNavigatorEvent(event) {
    if (event.id === 'sideMenu') {
      this.toggleContextMenu();
    }
    if (event.id === 'qrScan') {
      this.showQRScanScreen();
    }
  }

  toggleContextMenu = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  };

  showQRScanScreen = () => {
    this.props.navigator.showModal({
      screen: 'x.QRScan'
    });
  };


  handlePaymentSelection(item) {
    this.setState(previousState => {
      return {selectedPayment: item};
    });
    this.ActionSheetPayment.show();
  }
  handlePaymentAction(actionIndex) {
      if (actionIndex) {
        console.log('ACTION: ' + actionIndex);
        console.log('SELECTED ITEM: ' + this.state.selectedPayment.desc);
      }
  }

  handleCheckIn(item) {
    this.setState(previousState => {
      return {selectedActivity: item};
    });
    this.props.navigator.showModal({
      screen: 'x.Passes.Details',
      passProps: {
        selectedPlace: item,
        auth: this.props.auth
      }
    });
  }

  handleActivityAction(actionIndex) {
      if (actionIndex) {
        console.log('ACTION: ' + actionIndex);
        console.log('SELECTED ITEM: ' + this.state.selectedActivity.title);

        this.props.navigator.showModal({
          screen: 'x.QRScan'
        });
      }
  }

  loadActivityLiveDataMore = () => {
    this.setState({
      activityLiveCurrentPage: this.state.activityLiveCurrentPage + 1,
    }, () => {
      this.loadActivityLiveData();
    })
  }

  loadActivityLiveData = () => {
    const page = this.state.activityLiveCurrentPage;
    const size = 5;
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/event/geteventpasses?pageNo='+ page +'&pageSize=30&eventDate='+ moment(new Date()).format('DD-MM-YYYY') +'&searchText=';
    this.setState({ activityLiveLoading: true });
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.access_token
      }
    })
      .then(res => res.json())
      .then(res => {
        //alert(JSON.stringify(res.model.golocoEvents[0].golocoOffersAvailed[0]));

        for (var eventIdx in res.model.golocoEvents) {
          for(var offerIdx in res.model.golocoEvents[eventIdx].golocoEvent.golocoOffers) {
            res.model.golocoEvents[eventIdx].golocoEvent.golocoOffers[offerIdx].status = 'NOT_AVAILED';
            res.model.golocoEvents[eventIdx].golocoEvent.golocoOffers[offerIdx].eventName = res.model.golocoEvents[eventIdx].golocoEvent.name;
            for (var availedIdx in res.model.golocoEvents[eventIdx].golocoOffersAvailed) {
              if (res.model.golocoEvents[eventIdx].golocoOffersAvailed[availedIdx].userOfferAvailedId.offerId == res.model.golocoEvents[eventIdx].golocoEvent.golocoOffers[offerIdx].id) {
                res.model.golocoEvents[eventIdx].golocoEvent.golocoOffers[offerIdx].status = 'AVAILED';
                //alert('found')
                break;
              }
            }
          }
        }

        this.setState({
          activityLiveData: page === 1 ? res.model.golocoEvents : [...this.state.activityLiveData, ...res.model.golocoEvents],
          activityLiveLoading: false,
          activityLiveIsLastPage: (res.model.golocoEvents && res.model.golocoEvents.length == size) ? false : true
        });
      })
      .catch(error => {
        this.setState({ error, activityLiveLoading: false });
      });
  }

  componentDidMount() {
    this.loadActivityLiveData();

    //TEMP
    false && this.props.navigator.showModal({
      screen: 'x.Passes.OfferAvail',
      passProps: {
      },
      style: {
        backgroundBlur: "none",
        backgroundColor: "#000000aa",
        tapBackgroundToDismiss: true
      }
    });

  }

  render() {
    return (
        <FlatList
          data={this.state.activityLiveData}
          keyExtractor={item => {return item.golocoEventPassId.golocoEventId+'-'+item.golocoEventPassId.golocoUserId}}
          onEndReached={this.loadActivityLiveDataMore}
          onEndReachedThreshold={0}
          renderItem={
            ({item}) => 
              <PassesItem 
                image={item.golocoEvent.imageUrl}
                title={item.golocoEvent.name}
                subitems={{
                  location: item.golocoEvent.golocoLocation.address,
                  offersCount: item.golocoEvent.golocoOffers.length,
                  checkinCount: 0
                }}
                multiline={true}
                onPress={() => this.handleCheckIn(item)}
              />
          }
          ListHeaderComponent={
            <View style={[styles.listHeader, {height:20, backgroundColor: 'transparent'}]}><Text/><Text style={styles.listHeaderTitle}></Text><Text/></View>
          }
          ListFooterComponent={
            <View style={[styles.listHeader, {height:20, backgroundColor: 'transparent'}]}><Text/><Text style={styles.listHeaderTitle}></Text><Text/></View>
          }
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, width:100, alignSelf:'center', backgroundColor: '#fff', marginVertical:10}}></View>}
        />
    );
  }
}

export default MyClass;