import React from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity, Button, Text, FlatList, SectionList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Row from '../../components/Row';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet'

import { Style as styles } from '../../styles/Common';

class Transfer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem : null};
    this.handleAccountAction = this.handleAccountAction.bind(this)
  }

  navigateToNewPaymentScreen = () => {
    this.props.navigator.push({
      screen: 'x.Transfer.NewPayment',
      title: 'Pay Beneficiary'
    });
  };  

  navigateToTransferToAccountScreen = () => {
    this.props.navigator.push({
      screen: 'x.Transfer.NewTransfer',
      title: 'Transfer To Account'
    });
  };  

  handleAccountSelection(item) {
    this.setState(previousState => {
      return {selectedItem: item};
    });

    if (item.accountType == 'PRIMARY_SAVINGS')
      this.ActionSheetPrimary.show()
    else if (item.accountType == 'SAVINGS')
      this.ActionSheetSavings.show()
    else if (item.accountType == 'CREDIT_CARD')
      this.ActionSheetCredit.show()
    else if (item.accountType == 'TERM_LOAN')
      this.ActionSheetLoan.show()
  }

  handleAccountAction(actionIndex) {
      if (actionIndex) {
        console.log('ACTION: ' + ACCOUNT_ACTION[this.state.selectedItem.accountType][actionIndex-1].ACTION);
        console.log('SELECTED ITEM: ' + this.state.selectedItem.accountName);
      }
  }

  render() {

    var paymentsData = [{
      desc: "Vodacom Airtime",
      paymentDate: '23 MAR',
      amount: 'R1 674.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '1'
    },{
      desc: "StarSat Sports+ Re...",
      paymentDate: '23 MAR',
      amount: 'R199.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '2'
    },{
      desc: "Vodacom Airtime",
      paymentDate: '23 MAR',
      amount: 'R1 674.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '3'
    },{
      desc: "StarSat Sports+ Re...",
      paymentDate: '23 MAR',
      amount: 'R199.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '4'
    },{
      desc: "Vodacom Airtime",
      paymentDate: '23 MAR',
      amount: 'R1 674.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '5'
    },{
      desc: "StarSat Sports+ Re...",
      paymentDate: '23 MAR',
      amount: 'R199.00',
      type: 'DEBIT_ORDER',
      typeText: 'Debit Order',
      key: '6'
    }];


    return (

        <FlatList
          data = {paymentsData}
          renderItem = {
            ({item}) => 
              <Row 
                title={item.desc}
                rightText={item.amount}
                actionIcon={false}
                badgeText={item.typeText}
                onPress={() => this.handlePaymentSelection(item)}
              />
          }
          ListHeaderComponent={
                <View>
                    <View style={{paddingVertical:20}}>
                    <TouchableOpacity onPress={this.navigateToNewPaymentScreen}>
                      <View style={[styles.actionStyleButton, styles.actionStyleButtonPrimary]}>
                        <Text style={styles.actionStyleButtonSubText}>PAY TO</Text>
                        <Text style={styles.actionStyleButtonText}>BENEFICIARY</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.navigateToTransferToAccountScreen}>
                      <View style={[styles.actionStyleButton, styles.actionStyleButtonPrimary]}>
                        <Text style={styles.actionStyleButtonSubText}>TRANSFER TO</Text>
                        <Text style={styles.actionStyleButtonText}>OWN ACCOUNT</Text>
                      </View>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.listHeader}><Text style={styles.listHeaderTitle}>Upcoming Payments</Text><Text style={styles.listHeaderAction}>View All</Text></View>
                </View>
            }
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}></View>}
        />

    );
  }

}

export default Transfer;