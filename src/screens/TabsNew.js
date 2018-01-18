import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PassesItem from '../components/PassesItem';
import { Style as styles } from '../styles/Common';

const { width } = Dimensions.get('window');

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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    
    const to = 'hidden';
    this.props.navigator.toggleNavBar({to, animated: false});
  }

  onNavigatorEvent(event) {
    if (event.id === 'sideMenu') {
      this.toggleContextMenu();
    }
  }

  toggleContextMenu = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  };

  showTermsAndConditions = () => {
    this.props.navigator.showModal({
      screen: 'x.Places.TermsAndConditions'
    });
  };

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

  closeModal = () => {
    this.props.navigator.dismissModal();
  }
  
  showCameraView = () => {
    this.props.navigator.showModal({
      screen: 'x.CameraView'
    });
  }


  render() {
    return (

      <View style={{flex:1}}>
        
        <ScrollView contentContainerStyle={{flex:1, flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center'}}>
        
          <View style={{height:250, width: '100%'}}>
            <Image style={{width:'100%', height: 250}} source={require('../../img/pub.jpg')} />
            <View style={{position:'absolute', bottom:0, left:0, right:0, height:2,  backgroundColor:'#fff', shadowColor : '#000', shadowOpacity : 1,shadowRadius : 10,shadowOffset: {width: 0,height:-25}}}/>
            <Text style={{position:'absolute', bottom:10, left:19, backgroundColor:'transparent', color: '#fff', fontSize: 18, fontWeight: '700'}}>Happy Brew</Text>
            <Icon onPress={this.closeModal} name='close' style={{position:'absolute', top:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 32, fontWeight: '700'}}/>
            <Text onPress={this.showTermsAndConditions} style={{position:'absolute', bottom:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 10, fontWeight: '500', backgroundColor:'orange', paddingVertical:6, paddingHorizontal:10}}>Read T&C</Text>
          </View>
          
          <View style={{paddingVertical: 5, flex:1, padding:20, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.detailsRowText}>Click picture of the bill to proceed</Text>
            <View style={styles.verticalSeparatorLarge}/>

            <TouchableOpacity onPress={this.showCameraView} style={[styles.detailsRowContainer, {paddingVertical:20, paddingHorizontal:20, flexDirection:'column', alignItems:'center', borderColor: '#aaa', borderWidth:2, borderRadius: 10, borderStyle:'dashed'}]}>
              <Icon style={[styles.detailsRowIcon, {fontSize:42, width:120}]} name='camera'/>
              <View style={styles.verticalSeparatorMedium}/>
              <Text style={styles.detailsRowText}>Tap to open Camera or Gallery</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        <TouchableOpacity activeOpacity={0.7} style={styles.buttonPrimary}>
            <Text style={{color:'#fff', fontWeight: '700'}}>Put On Tab</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

export default MyClass;