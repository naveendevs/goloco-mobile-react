import React from 'react';
import {Dimensions, StyleSheet,WebView, Image, View, FlatList,SectionList, ActivityIndicator, TouchableOpacity,TextInput, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style as styles } from '../styles/Common';

const { width } = Dimensions.get('window');


class MyClass extends React.Component {

  STYLE = {
    INFO: {
      BACKGROUND_COLOR: '',
      TEXT_COLOR: '',
      BUTTON_COLOR: '',
      BUTTON_TEXT_COLOR: '',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={[styles.shadowLight, {width: width, backgroundColor:'#eee', paddingHorizontal:20, paddingVertical:20, alignItems: 'center', justifyContent: 'center',flexDirection: "column"}]}>
          <View style={{width: '100%', alignItems: 'center', justifyContent: 'center',flexDirection: "row"}}>
            <Icon name={this.props.icon} style={{ flex:0.2, textAlign:'left', color: '#3f51b5', fontSize: 50, fontWeight: '700'}}/>
            <View style={{flex:0.8, flexDirection:'column'}}>
            <Text style={{width: '100%', flexWrap: 'wrap', fontSize:18, fontWeight:'700', color:'#3f51b5'}}>{this.props.message}</Text>

            { (typeof this.props.subMessage == 'object') &&
              <View style={{marginTop:5}}>
              {this.props.subMessage.map((value, key) => {              
                return <Text key={key} style={{width: '100%', flexWrap: 'wrap', fontSize:12, fontWeight:'600', color:'#555555'}}>{value}</Text>
              })}
              </View>
            }

            { (typeof this.props.subMessage != 'object') &&
            <Text style={{width: '100%', flexWrap: 'wrap', fontSize:12, fontWeight:'600', color:'#555555', marginTop:5}}>{this.props.subMessage}</Text>
            }

            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center', justifyContent: 'center',flexDirection: "row", marginTop:10,}}>
            { this.props.buttons && this.props.buttons.map((value, key) => {
              return <TouchableOpacity key={key} onPress={value.onPress} activeOpacity={0.7} style={[styles.buttonPrimary, {paddingHorizontal:20, marginHorizontal:5, backgroundColor:'transparent', borderRadius:6, borderWidth:2, borderColor:'#3f51b5', height:35}]}>
                <Text style={{color:'#3f51b5', fontSize:12, fontWeight: '700'}}>{value.text}</Text>
              </TouchableOpacity>
            })}
          </View>
      </View>
    );
  }
}

export default MyClass;