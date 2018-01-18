import React from 'react';
import { StyleSheet, ScrollView, View, Button, Text, FlatList, ActivityIndicator, SectionList, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { VictoryBar,VictoryChart,VictoryAxis,VictoryTheme, VictoryLabel, VictoryPie } from "victory-native";
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

import Row from '../../components/Row';
import { Style as styles } from '../../styles/Common';

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
    console.log('\n\n\n\n----------------------------------------------');
    console.log(url);
    console.log('----------------------------------------------\n\n\n\n');
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

    var accountTypeIcons = {
      PRIMARY_SAVINGS: {
        icon: 'diamond',
        iconColor: '#7799dd'
      },
      SAVINGS: {
        icon: 'diamond',
        iconColor: '#77dd77'
      },
      CREDIT_CARD: {
        icon: 'credit-card',
        iconColor: '#ff6961'
      },
      TERM_LOAN: {
        icon: 'ticket',
        iconColor: '#ff6961'
      }
    }

    var paymentsData = [{
      desc: "Vodacom Airtime",
      paymentDate: '23 MAR',
      amount: 'R1 674.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '1'
    },{
      desc: "Monthly bill for 8009",
      paymentDate: '23 MAR',
      amount: 'R199.00',
      type: 'DEBIT_ORDER',
      typeText: 'Credit Card',
      key: '2'
    }];

    var activityData = [{
      title: "Transfered R150.00 to Bruce Wayne",
      dateTime: 'Today',
      type: 'TRANSFER',
      subType: 'TRANSFER_NOW',
      key: '1'
    },{
      title: "Fixed Saving for Tiguan account for 6 months",
      dateTime: 'Yesterday',
      type: 'ACCOUNT',
      subType: 'FIXED_CONVERSION',
      key: '2'
    },{
      title: "Fixed Saving for Tiguan account for 6 months",
      dateTime: 'Yesterday',
      type: 'ACCOUNT',
      subType: 'FIXED_CONVERSION',
      key: '3'
    }];

    const sampleData = [
      {quarter: 1, earnings: 13000},
      {quarter: 2, earnings: 16500},
      {quarter: 4, earnings: 1}
    ];


    return (
        <FlatList
          data={this.state.activityLiveData}
          keyExtractor={item => item.key}
          onEndReached={this.loadActivityLiveDataMore}
          onEndReachedThreshold={0}
          renderItem={
            ({item}) => 
              <Row 
                title={item.title}
                subtitle={item.dateTime}
                actionIcon={false}
                icon={'feed'}
                iconColor={'#ff6961'}
                multiline={true}
                iconPos={'flex-start'}
                onPress={() => this.handleActivitySelection(item)}
              />
          }
          ListHeaderComponent={
            <View>

        <ActionSheet
          ref={o => this.ActionSheetPayment = o}
          options={[
            <Text style={styles.actionSheetCancelItem}>CANCEL</Text>,
            <Text style={styles.actionSheetItem}>PAY NOW</Text>,
            <Text style={styles.actionSheetItem}>VIEW DETAILS</Text>
          ]}
          cancelButtonIndex={0}
          onPress={this.handlePaymentAction}
        />  
        <ActionSheet
          ref={o => this.ActionSheetActivity = o}
          options={[
            <Text style={styles.actionSheetCancelItem}>CANCEL</Text>,
            <Text style={styles.actionSheetItem}>REPORT THIS ACTIVITY</Text>,
          ]}
          cancelButtonIndex={0}
          onPress={this.handleActivityAction}
        />  

<View style={[styles.listHeader]}>
<Text style={styles.listHeaderTitle}>Quick Summary</Text>
<Text style={styles.listHeaderAction}>Configure</Text>
</View>
          <ScrollView style={{backgroundColor: '#ddd'}} horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={10}>


              <View style={[{backgroundColor: '#ddd', height:200, width: width}]}>
                <VictoryChart 
                    label={() => null}
                  domainPadding={{ x: 30 }}
                  domain={{ y: [0, 3] }}
                  height={200}
                >
                  <VictoryAxis
                    labels={() => null}
                    style={{
                      axis: {stroke: "#756f6a"},
                      axisLabel: {fontSize: 0, padding: 0},
                      ticks: {stroke: "grey", size: 0},
                      tickLabels: {fontSize: 12, padding: -10}
                    }}
                  />
                  <VictoryBar 
                    label={() => null}
                    animate={{
                      duration: 500,
                      onLoad: { duration: 500 }
                    }}
                    style={{ 
                      data: { fill: "#ff6961" },
                      labels: { fill: '#fff'}
                    }}
                    data={[
                      {x: "Apr", y: 1},
                      {x: "May", y: 2},
                      {x: "Jun", y: 3},
                      {x: "Jul", y: 2},
                      {x: "Aug", y: 1}
                    ]}
                  />
                </VictoryChart>
              </View>

              <View style={[{backgroundColor: '#ddd', height:200, width: width}]}>
        <VictoryPie
          labels={() => null}
          width={width}
          height={200}
          colorScale={["#77dd77", "#ff6961"]}
          data={[
            20,80
          ]}
          innerRadius={0}
          labelRadius={20}
          style={{ labels: { fontSize: 0, fill: "transparent"}}}
        />
              </View>


          </ScrollView>

            <FlatList
              data= {paymentsData}
              renderItem={
                ({item}) => 
                  <Row 
                    title={item.desc}
                    rightText={item.amount}
                    actionIcon={false}
                    badgeText={item.typeText}
                    onPress={() => this.handlePaymentSelection(item)}
                  />
              }
              ListHeaderComponent={<View style={styles.listHeader}><Text style={styles.listHeaderTitle}>Upcoming Payments</Text><Text style={styles.listHeaderAction}>View All</Text></View>}
              ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}></View>}
            />
            <View style={styles.listHeader}><Text style={styles.listHeaderTitle}>Activity</Text><Text style={styles.listHeaderAction}>View All</Text></View>
            </View>
          }
          ListFooterComponent={() => {
              if (this.activityLiveIsLastPage) return (
                <View
                  style={{
                    height: 40,
                    paddingVertical: 20,
                  }}
                >
                <Text>NO MORE ACTIVITIES</Text>
               </View>
              )
              if (!this.state.activityLiveLoading) return (
                <View
                  style={{
                    height: 40,
                    paddingVertical: 20,
                  }}
                >
               </View>
              );
              return (
                <View
                  style={{
                    height: 40,
                    paddingVertical: 20,
                  }}
                >
                  <ActivityIndicator animating size="small" />
                </View>
              );
          }}
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}></View>}
        />

    );
  }
}

export default MyClass;