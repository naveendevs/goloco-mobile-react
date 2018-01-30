import React from 'react';
import { StyleSheet, Animated, ScrollView, View, Button, Text, FlatList, ActivityIndicator, SectionList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import PlacesItem from '../components/PlacesItem';
import { Style as styles } from '../styles/Common';

const { width } = Dimensions.get('window');

const activityType = {
  TRANSACTION: {
      icon: '',
      iconColor: '',
  },
  DEBIT_ORDER_ADDED: {
      icon: '',
      iconColor: '',
  },
}

class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPlace : null,

      placesDataLoading : false,
      placesData : [],
      placesDataCurrentPage : 1,
      placesDataIsLastPage: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    
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

  handlePlaceSelection(item) {
    this.setState(previousState => {
      return {selectedPlace: item};
    });
    this.props.navigator.showModal({
      screen: 'x.Places.Details',
      passProps: {
        selectedPlace: item,
        auth: this.props.auth
      }
    });

  }

  loadPlacesDataMore = () => {
    this.setState({
      placesDataCurrentPage: this.state.placesDataCurrentPage + 1,
    }, () => {
      this.loadPlacesData();
    })
  }

  loadPlacesData = () => {
    const page = this.state.placesDataCurrentPage;
    const size = 5;
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/event/getevents?pageNo='+ page +'&pageSize=30&eventDate=' + moment(new Date()).format('DD-MM-YYYY') + '&searchText=';
    //const url = 'http://reactec.getsandbox.com/places?page='+page;
    this.setState({ placesDataLoading: true });
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.access_token
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          placesData: page === 1 ? res.model.golocoEvents : [...this.state.placesData, ...res.model.golocoEvents],
          placesDataLoading: false,
          placesDataIsLastPage: (res.model.golocoEvents.length) ? false : true
        });
      })
      .catch(error => {
        this.setState({ error, placesDataLoading: false });
      });
  }

  componentDidMount() {
    this.loadPlacesData();
  }

  render() {
    return (
        <FlatList
          data={this.state.placesData}
          keyExtractor={item => item.id}
          onEndReached={this.loadPlacesDataMore}
          onEndReachedThreshold={0}
          renderItem={
            ({item}) => 
              <PlacesItem 
                image={item.imageUrl}
                title={item.name}
                subitems={{
                  location: item.golocoLocation.address,
                  offersCount: item.golocoOffers.length,
                  checkinCount: 0
                }}
                multiline={true}
                onPress={() => this.handlePlaceSelection(item)}
              />
          }
          ListHeaderComponent={
            <View style={[styles.listHeader, {height:30, backgroundColor: 'transparent'}]}><Text/><Text style={[styles.listHeaderTitle, {color:'#000000aa'}]}>Today's Events</Text><Text/></View>
          }
          ListFooterComponent={() => {
              if (this.state.placesDataIsLastPage) return (
                <View
                  style={{
                    width:'100%',
                    height: 40,
                    paddingBottom:10,
                    flexDirection:'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                <Text style={{color:'#888', fontSize: 12}}>This is the end, my friend</Text>
               </View>
              );
              if (!this.state.placesDataLoading) return (
                <View
                  style={{
                    height: 40,
                    paddingVertical: 20,
                  }}
                >
               </View>
              );
              return (
                <View
                  style={{
                    height: 40,
                    paddingVertical: 20,
                  }}
                >
                  <ActivityIndicator animating size="small" />
                </View>
              );
          }}
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, width:100, alignSelf:'center', marginVertical:0}}></View>}
        />
    );
  }
}

export default MyClass;