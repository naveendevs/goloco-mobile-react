import React from 'react';
import {StyleSheet, View, Button, Text, FlatList, SectionList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Row from '../../components/Row';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet'

import { Style as styles } from '../../styles/Common';


const ACCOUNT_ACTION = {
  PRIMARY_SAVINGS: [{
      ACTION: 'ACCOUNT_DETAILS',
      TEXT: 'ACCOUNT DETAILS'
    },{
      ACTION: 'TRANSFER_MONEY',
      TEXT: 'TRANSFER MONEY'
    },{
      ACTION: 'TRANSACTION_HISTORY',
      TEXT: 'TRANSACTION HISTORY'
  }],

  SAVINGS: [{
      ACTION: 'ACCOUNT_DETAILS',
      TEXT: 'ACCOUNT DETAILS'
    },{
      ACTION: 'TRANSFER_MONEY',
      TEXT: 'TRANSFER MONEY'
    },{
      ACTION: 'TRANSACTION_HISTORY',
      TEXT: 'TRANSACTION HISTORY'
    },{
      ACTION: 'FIX_SAVINGS',
      TEXT: 'FIX SAVINGS'
    },{
      ACTION: 'CLOSE_ACCOUNT',
      TEXT: 'CLOSE ACCOUNT'
  }],

  CREDIT_CARD: [{
      ACTION: 'CARD_DETAILS',
      TEXT: 'CARD DETAILS'
    },{
      ACTION: 'TRANSFER_MONEY',
      TEXT: 'TRANSFER MONEY'
    },{
      ACTION: 'TRANSACTION_HISTORY',
      TEXT: 'TRANSACTION HISTORY'
    },{
      ACTION: 'CARD_LIMITS',
      TEXT: 'CHANGE LIMITS'
    },{
      ACTION: 'STOP_CARD',
      TEXT: 'STOP CARD'
  }], 

  TERM_LOAN: [{
      ACTION: 'ACCOUNT_DETAILS',
      TEXT: 'ACCOUNT DETAILS'
    },{
      ACTION: 'TRANSFER_MONEY',
      TEXT: 'TRANSFER MONEY'
    },{
      ACTION: 'TRANSACTION_HISTORY',
      TEXT: 'TRANSACTION HISTORY'
  }]
}

class AccountTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem : null};
    this.handleAccountAction = this.handleAccountAction.bind(this)
  }

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

    var accountType = {
      PRIMARY_SAVINGS: {
        type: 'PRIMARY_SAVINGS',
        icon: 'diamond',
        iconColor: '#7799dd'
      },
      SAVINGS: {
        type: 'SAVINGS',
        icon: 'diamond',
        iconColor: '#77dd77'
      },
      CREDIT_CARD: {
        type: 'CREDIT_CARD',
        icon: 'credit-card',
        iconColor: '#ff6961'
      },
      TERM_LOAN: {
        type: 'TERM_LOAN',
        icon: 'ticket',
        iconColor: '#ff6961'
      }
    }

    var accountData = [{
      accountName: "Primary Savings",
      accountBalance: 'R12 006.00',
      accountType: 'PRIMARY_SAVINGS',
      accountTypeText: 'PRIMARY',
      key: '1'
    },{
      accountName: "Saving For Tiguan",
      accountBalance: 'R1 06.00',
      accountType: 'SAVINGS',
      accountTypeText: 'FLEXIBLE',
      key: '2'
    },{
      accountName: "Euro Trip",
      accountBalance: 'R52 306.50',
      accountType: 'SAVINGS',
      accountTypeText: 'FIXED FOR 6 MONTHS',
      key: '3'
    },{
      accountName: "Ending With 6199",
      accountBalance: 'R306.50',
      accountType: 'CREDIT_CARD',
      accountTypeText: 'VISA',
      key: '4'
    },{
      accountName: "Ending With 8069",
      accountBalance: 'R34 306.50',
      accountType: 'CREDIT_CARD',
      accountTypeText: 'MASTER CARD',
      key: '5'
    },{
      accountName: "6 Month Loan",
      accountBalance: 'R3 126.00',
      accountType: 'TERM_LOAN',
      accountTypeText: 'STARTED ON 23 MAR 2017',
      key: '6'
    },{
      accountName: "12 Month Loan",
      accountBalance: 'R34 306.50',
      accountType: 'TERM_LOAN',
      accountTypeText: 'STARTED ON 19 JUL 2017',
      key: '7'
    },{
      accountName: "3 Month Loan",
      accountBalance: 'R34 306.50',
      accountType: 'TERM_LOAN',
      accountTypeText: 'STARTED ON 30 NOV 2017',
      key: '8'
    }];

    return (
      <View>
        <SectionList
          sections={[
            {title: 'Savings', data: [accountData[0], accountData[1], accountData[2]]},
            {title: 'Credit Cards', data: [accountData[3], accountData[4]]},
            {title: 'Loans', data: [accountData[5],accountData[6],accountData[7]]},
          ]}
          renderItem={
            ({item}) => 
              <Row 
                title={item.accountName} 
                subtitle={item.accountTypeText} 
                rightText={item.accountBalance} 
                icon={accountType[item.accountType].icon}
                iconColor={accountType[item.accountType].iconColor}
                height={60}
                actionIcon={'ellipsis-y'}
                onPress={() => this.handleAccountSelection(item)}
              />
          }
          renderSectionHeader={({section}) => <View style={styles.listHeader}><Text style={styles.listHeaderTitle}>{section.title}</Text><Text style={styles.listHeaderAction}></Text></View>}
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}></View>}
        />

        <ActionSheet
          ref={o => this.ActionSheetPrimary = o}
          options={
            [<Text style={styles.actionSheetCancelItem}>CANCEL</Text>].concat(
            ACCOUNT_ACTION.PRIMARY_SAVINGS.map(function(item) {
              return ( <Text style={styles.actionSheetItem}>{item.TEXT}</Text>);
            }))
          }
          cancelButtonIndex={0}
          onPress={this.handleAccountAction}
        />

        <ActionSheet
          ref={o => this.ActionSheetSavings = o}
          options={
            [<Text style={styles.actionSheetCancelItem}>CANCEL</Text>].concat(
            ACCOUNT_ACTION.SAVINGS.map(function(item) {
              return ( <Text style={styles.actionSheetItem}>{item.TEXT}</Text>);
            }))
          }
          cancelButtonIndex={0}
          onPress={this.handleAccountAction}
        />

        <ActionSheet
          ref={o => this.ActionSheetCredit = o}
          options={
            [<Text style={styles.actionSheetCancelItem}>CANCEL</Text>].concat(
            ACCOUNT_ACTION.CREDIT_CARD.map(function(item) {
              return ( <Text style={styles.actionSheetItem}>{item.TEXT}</Text>);
            }))
          }
          cancelButtonIndex={0}
          onPress={this.handleAccountAction}
        />

        <ActionSheet
          ref={o => this.ActionSheetLoan = o}
          options={
            [<Text style={styles.actionSheetCancelItem}>CANCEL</Text>].concat(
            ACCOUNT_ACTION.TERM_LOAN.map(function(item) {
              return ( <Text style={styles.actionSheetItem}>{item.TEXT}</Text>);
            }))
          }
          cancelButtonIndex={0}
          onPress={this.handleAccountAction}
        />  

      </View>
    );
  }

}

export default AccountTab;
