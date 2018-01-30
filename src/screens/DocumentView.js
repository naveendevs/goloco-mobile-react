import React from 'react';
import {StyleSheet,WebView, Image, View, FlatList,SectionList, ActivityIndicator, TouchableOpacity,TextInput, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  componentDidMount() {
  }

  closeModal = () => {
    this.props.navigator.dismissModal();    
  }

  render() {
    return (
      <View style={{flex:1}}>
      <View style={{width:'100%',backgroundColor:'#fafafa', paddingHorizontal: 10, height:60, borderBottomWidth:1, borderColor:'#ddd', alignItems: 'center', justifyContent: 'space-between',flexDirection: "row"}}>
          <View style={{width:50}}/>
          <Text style={{fontSize: 18, fontWeight:'700', color:'#555'}}>{this.props.title}</Text>
          <TouchableOpacity style={{width:50}}>
            <Icon onPress={this.closeModal}  name='close' style={{width:50, textAlign:'center', color: '#aaa', fontSize: 32, fontWeight: '700'}}/>
          </TouchableOpacity>
      </View>
      <WebView
        source={{uri: this.props.contentUri}}
        style={{flex:1}}
      />
      </View>
    );
  }
}

export default MyClass;