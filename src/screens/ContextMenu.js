import React from 'react';
import {StyleSheet, Image,View, ScrollView, TouchableOpacity, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style as stylesCommon } from '../styles/Common';

class MyClass extends React.Component {

  constructor(props) {
    super(props);
  }
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

  navigateToInvitesScreen = () => {
    //this.toggleDrawer();
    this.props.navigator.showModal({
      screen: 'x.Invites',
      passProps: {
        auth: this.props.auth
      }
    });
  };


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{uri: 'https://poetsandquants.com/wp-content/uploads/2014/02/Screen-Shot-2014-02-22-at-9.32.41-AM.png'}} />
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{this.props.user.name}</Text>
          </View>
        </View>
  
        <View style={{width:'100%'}} />

        <ScrollView style={{width: '100%'}}>

          <View style={stylesCommon.verticalSeparatorLarge} />
          <View style={stylesCommon.verticalSeparatorLarge} />

          <TouchableOpacity style={styles.contextMenuItem} onPress={this.navigateToInvitesScreen} underlayColor={'#ddd'}>
              <View style={styles.contextMenuItemWrapper}>
                  <Icon name="user" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                  <Text style={styles.contextMenuItemText}>PROFILE</Text>
              </View>
          </TouchableOpacity>

          { this.props.user.admin &&
          <TouchableOpacity style={styles.contextMenuItem} onPress={this.navigateToInvitesScreen} underlayColor={'#ddd'}>
              <View style={styles.contextMenuItemWrapper}>
                  <Icon name="id-badge" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                  <Text style={styles.contextMenuItemText}>INVITES</Text>
              </View>
          </TouchableOpacity>
          }
          
          <TouchableOpacity style={styles.contextMenuItem} onPress={this.navigateToInvitesScreen} underlayColor={'#ddd'}>
              <View style={styles.contextMenuItemWrapper}>
                  <Icon name="comment" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                  <Text style={styles.contextMenuItemText}>GIVE FEEDBACK</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contextMenuItem} onPress={this.navigateToInvitesScreen} underlayColor={'#ddd'}>
              <View style={styles.contextMenuItemWrapper}>
                  <Icon name="info-circle" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                  <Text style={styles.contextMenuItemText}>TERMS OF USE</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contextMenuItem} onPress={this.navigateToInvitesScreen} underlayColor={'#ddd'}>
              <View style={styles.contextMenuItemWrapper}>
                  <Icon name="info-circle" style={styles.contextMenuItemIcon} size={14} color="#555" />            
                  <Text style={styles.contextMenuItemText}>PRIVACY POLICY</Text>
              </View>
          </TouchableOpacity>

          <View style={{width:'100%', marginTop:50, flex:1, alignItems: 'center', justifyContent:'flex-end'}}>
            <Text style={{fontSize: 10, fontWeight: '600', color:'#ffffff55'}}>Goloco</Text>
            <Text style={{fontSize: 9, fontWeight: '600', marginTop:3, color:'#ffffff55'}}>v1.0.0 beta</Text>
          </View>
        
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#4d5ec1',
    paddingBottom: 20,
  },
  profileContainer: {
    paddingHorizontal:20,
    paddingVertical:30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: "row",
    backgroundColor: '#3f51b5'
  },
  button: {
    color: '#333',
  },
  profileName: {
    fontSize: 20,
    color: "#ffffffbb",
    fontWeight: '700'
  },
  profileEmail: {
    fontSize: 10,
    color: "#666"
  },
  profileNameContainer: {
    height: 70,
    flex:1,
    paddingBottom:30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },
  profileImage: {
      backgroundColor: "#ccc",
      borderRadius: 50,
      borderWidth:2,
      borderColor: '#ffffffbb',
      width: 100,
      height: 100,
      position:'absolute',
      bottom:-50,
  },
  contextMenuItem: {
    width:'100%',
    paddingVertical:14,
    paddingHorizontal: 6,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#3f51b5",
    borderTopColor: "#3f51b5"
  },
  contextMenuItemText: {
    color: '#ffffffbb',
    fontSize: 14,
    fontWeight: '600'
  },
  contextMenuItemIcon: {
    color: '#ffffffbb',
    fontSize: 16,
    width: 16,
    textAlign: 'center',
    marginRight: 12
  },
  contextMenuItemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "row",
  },
  contextMenuItemBadge: {
    marginLeft:5, 
    backgroundColor: '#ff6961',
    height: 18,
    width: 18,
    borderRadius: 9,
    right:0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  },
  contextMenuItemBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default MyClass;