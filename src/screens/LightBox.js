import React from 'react';
import {StyleSheet,ScrollView, Image, View, FlatList,SectionList, ActivityIndicator, TouchableHighlight,TextInput, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style as styles } from '../styles/Common';

class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{width:300, height:500}}>
      <View style={[styles.interactiveHeader]}>
        <Text style={{lineHeight:40, flex:1, fontWeight:'700', fontSize:18}}>{this.props.title}</Text>
        <TouchableHighlight><Icon onPress={this.props.closeAction}  name='close' style={{color: '#aaa', fontSize: 32, fontWeight: '700', textAlign: 'right', lineHeight:40, width:50}}/></TouchableHighlight>
      </View>
      <ScrollView style={{backgroundColor:'#fff', padding: 20}}>
        <Text style={{fontSize:14}}>{this.props.content}</Text>
      </ScrollView>
      </View>
    );
  }
}

export default MyClass;