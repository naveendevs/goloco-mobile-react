import React from 'react';
import { StyleSheet, ScrollView, View, Button, Text, FlatList, ActivityIndicator, SectionList, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

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

  handleActivitySelection(item) {
    this.setState(previousState => {
      return {selectedActivity: item};
    });
    this.ActionSheetActivity.show();
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
    const url = 'https://reactec.getsandbox.com/activity?page='+page;
    this.setState({ activityLiveLoading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          activityLiveData: page === 1 ? res.activities : [...this.state.activityLiveData, ...res.activities],
          activityLiveLoading: false,
          activityLiveIsLastPage: (res.activities && res.activities.length == size) ? false : true
        });
      })
      .catch(error => {
        this.setState({ error, activityLiveLoading: false });
      });
  }

  componentDidMount() {
    this.loadActivityLiveData();
  }

  render() {
    return (
        <FlatList
          style={{marginVertical: 20}}
          data={this.state.activityLiveData}
          keyExtractor={item => item.key}
          onEndReached={this.loadActivityLiveDataMore}
          onEndReachedThreshold={0}
          renderItem={
            ({item}) => 
              <PassesItem 
                image={''}
                title={item.title}
                subitems={{
                  location: 'location',
                  offerCount: 2,
                  checkinCount: 23
                }}
                icon={'feed'}
                iconColor={'#ff6961'}
                multiline={true}
                iconPos={'flex-start'}
                onPress={() => this.handleActivitySelection(item)}
              />
          }
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, width:100, alignSelf:'center', backgroundColor: '#fff', marginVertical:10}}></View>}
        />
    );
  }
}

export default MyClass;