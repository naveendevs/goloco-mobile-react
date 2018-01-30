import React from 'react';
import {StyleSheet, Image,View, ScrollView, FlatList,SectionList, ActivityIndicator, TouchableOpacity,TextInput, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InvitesItem} from '../components/InvitesItem';
import { Style as styles } from '../styles/Common';

class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.props.navigator.toggleNavBar({to: 'hidden', animated: false});
    this.props.navigator.setStyle({statusBarHidden: true});
  }

  closeModal = () => {
    this.props.navigator.dismissModal();
  }

  componentDidMount() {
  }

  sendFeedback = () => {
    this.props.navigator.showInAppNotification({
     screen: "x.Notification", // unique ID registered with Navigation.registerScreen
     passProps: {}, // simple serializable object that will pass as props to the in-app notification (optional)
     autoDismissTimerSec: 1 // auto dismiss notification in seconds
    });
  }

  render() {
    return (
      <View>
        <View style={{width:'100%',backgroundColor:'#fafafa', paddingHorizontal: 10, height:60, borderBottomWidth:1, borderColor:'#ddd', alignItems: 'center', justifyContent: 'space-between',flexDirection: "row"}}>
            <View style={{width:50}}/>
            <Text style={{fontSize: 18, fontWeight:'700', color:'#555'}}>FEEDBACK</Text>
            <TouchableOpacity style={{width:50}}>
              <Icon onPress={this.closeModal}  name='close' style={{width:50, textAlign:'center', color: '#aaa', fontSize: 32, fontWeight: '700'}}/>
            </TouchableOpacity>
        </View>

      <ScrollView contentContainerStyle={{padding: 30,justifyContent: 'center',flexDirection: "column"}}>
        <View style={{width: '100%'}}>
          <View style={{marginVertical: 0}}>
            <Text style={{fontSize: 14, fontWeight:'600', color:'#888'}}>Leave us a feedback</Text>
            <TextInput placeholder={'write here...'} multiline={true} style={{paddingHorizontal:10, paddingVertical:20, marginTop:10, fontSize: 16, color:'#555', borderColor:'#aaa', borderWidth: 1, height:160, borderRadius:10}} />
          </View>
          <TouchableOpacity onPress={this.sendFeedback} activeOpacity={0.7} style={[styles.buttonPrimary, {backgroundColor:'#fff', borderRadius:10, borderWidth:2, borderColor:'#aaa', marginTop:20, height:50}]}>
            <Text style={{color:'#555', fontSize:14, fontWeight: '600'}}>GIVE FEEDBACK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>

    );
  }
}

export default MyClass;