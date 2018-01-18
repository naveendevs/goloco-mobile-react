import React from 'react';
import {StyleSheet, Image,View, ScrollView, TouchableHighlight, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyClass extends React.Component {

  onLogin = () => {
    this.toggleDrawer();
    this.props.navigator.handleDeepLink({
      link: 'tab1/example.Types.Push'
    });
  };

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left'
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
  
        <TouchableHighlight style={styles.contextMenuItem} onPress={() => onLogin()} underlayColor={'#efefef'}>
            <View style={styles.contextMenuItemWrapper}>
                <Icon name="refresh" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                <Text style={styles.contextMenuItemText}>Debit Orders</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.contextMenuItem} onPress={() => onLogin()} underlayColor={'#efefef'}>
            <View style={styles.contextMenuItemWrapper}>
                <Icon name="users" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                <Text style={styles.contextMenuItemText}>Manage Beneficiary</Text>
            </View>    
        </TouchableHighlight>
        <TouchableHighlight style={styles.contextMenuItem} onPress={() => onLogin()} underlayColor={'#efefef'}>
            <View style={styles.contextMenuItemWrapper}>
                <Icon name="mobile" style={styles.contextMenuItemIcon} size={18} color="#555" />            
                <Text style={styles.contextMenuItemText}>Airtime</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.contextMenuItem} onPress={() => onLogin()} underlayColor={'#efefef'}>
            <View style={styles.contextMenuItemWrapper}>
                <Icon name="bank" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                <Text style={styles.contextMenuItemText}>SARS eFiling</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.contextMenuItem} onPress={() => onLogin()} underlayColor={'#efefef'}>
            <View style={styles.contextMenuItemWrapper}>
                <Icon name="usd" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                <Text style={styles.contextMenuItemText}>Pay Me</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.contextMenuItem} onPress={() => onLogin()} underlayColor={'#efefef'}>
            <View style={styles.contextMenuItemWrapper}>
                <Icon name="user" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                <Text style={styles.contextMenuItemText}>Refer a Friend</Text>
            </View>
        </TouchableHighlight>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  button: {
    color: '#333',
  },
  contextMenuItem: {
    width:'100%',
    paddingVertical:14,
    paddingHorizontal: 6,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    //borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderTopColor: "#888"
  },
  contextMenuItemText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '500'
  },
  contextMenuItemIcon: {
    color: '#555',
    fontSize: 16,
    width: 18,
    textAlign: 'center',
    marginRight: 10
  },
  contextMenuItemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "row"
  }
});

export default MyClass;