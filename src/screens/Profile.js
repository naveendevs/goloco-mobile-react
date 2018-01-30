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

  updatePicture = (phone, callback) => {
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/user/approve?phoneNumber=' + encodeURIComponent(phone);
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
      if(!res.hasError) {
        callback('APPROVED');
      }
    })
    .catch(error => {
    });
  }

  render() {
    return (
      <View>
        <View style={{width:'100%',backgroundColor:'#fafafa', paddingHorizontal: 10, height:60, borderBottomWidth:1, borderColor:'#ddd', alignItems: 'center', justifyContent: 'space-between',flexDirection: "row"}}>
            <View style={{width:50}}/>
            <Text style={{fontSize: 18, fontWeight:'700', color:'#555'}}>PROFILE</Text>
            <TouchableOpacity style={{width:50}}>
              <Icon onPress={this.closeModal}  name='close' style={{width:50, textAlign:'center', color: '#aaa', fontSize: 32, fontWeight: '700'}}/>
            </TouchableOpacity>
        </View>

      <ScrollView contentContainerStyle={{padding: 50,justifyContent: 'center',flexDirection: "column"}}>
        <View style={{alignItems: 'center',justifyContent: 'center',flexDirection: "column"}}>
          <Image style={{width:160, height:160, borderRadius:80}} source={{uri: 'https://poetsandquants.com/wp-content/uploads/2014/02/Screen-Shot-2014-02-22-at-9.32.41-AM.png'}} />
          <Text style={{fontSize: 22, fontWeight:'600', marginTop:20, color:'#555'}}>Naveen Saini</Text>
        </View>

        <View style={{width: '100%', borderTopWidth:1, borderColor:'#ddd', marginVertical: 20}}/>

        <View style={{width: '100%'}}>
          <View style={{marginVertical: 0}}>
            <Text style={{fontSize: 14, fontWeight:'600', color:'#888'}}>PHONE</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color:'#555'}}>8951546101</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 14, fontWeight:'600', color:'#888'}}>EMAIL</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color:'#555'}}>jnu.naveen@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
      </View>

    );
  }
}

export default MyClass;