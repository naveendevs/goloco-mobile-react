import React from 'react';
import {StyleSheet, Image,View, FlatList,SectionList, ActivityIndicator, TouchableHighlight,TextInput, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InvitesItem} from '../components/InvitesItem';
import { Style as styles } from '../styles/Common';

class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invitesData: [],
      loading: false,
      isLastPage: false,
      currentPage: 1,
      searchText: ''
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    

    this.props.navigator.toggleNavBar({to: 'hidden', animated: false});
    this.props.navigator.setStyle({statusBarHidden: true});

  }

  closeModal = () => {
    this.props.navigator.dismissModal();
  }

  onNavigatorEvent(event) {
    if (event.id === 'close') {
      this.props.navigator.dismissModal();
    }
  }

  componentDidMount() {
    this.loadInvites();
  }

  searchInvites = (text) => {
    this.setState({
      currentPage: 1,
      isLastPage: false,
      invitesData: [],
      searchText: text.text
    }, () => {
      this.loadInvites()
    });
  }

  loadInvitesMore = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    }, () => {
      this.loadInvites();
    })
  }

  loadInvites = () => {
    const page = this.state.currentPage;
    const size = 10;
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/user/getinvites?pageNo='+page+'&pageSize='+size+'&searchText=' + encodeURIComponent(this.state.searchText)
    this.setState({ loading: true });
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
        invitesData: page === 1 ? res.model.golocoInviteRequests : [...this.state.invitesData, ...res.model.golocoInviteRequests],
        loading: false,
        isLastPage: (res.model.golocoInviteRequests.length) ? false : true
      });
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
  }

  doReject = (phone, callback) => {
    const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/user/deny?phoneNumber=' + encodeURIComponent(phone);
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
        callback('DENIED');
      }
    })
    .catch(error => {
    });
  }

  doApprove = (phone, callback) => {
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
        <SectionList
          data={this.state.invitesData}
          keyExtractor={item => item.id}
          onEndReached={this.loadInvitesMore}
          onEndReachedThreshold={0}
          stickyHeaderIndices={[0]}
          sections={[{data: this.state.invitesData}]}
          renderItem={
            ({item}) => 
              <InvitesItem
                imageURL={item.selfieImageUrl}
                name={item.name}
                email={item.emailId}
                phone={item.phoneNumber}
                status={item.inviteStatus}
                createdAt={(new Date(item.createdAt)).toLocaleString()}
                approveAction={this.doApprove}
                rejectAction={this.doReject}
              />
          }
          renderSectionHeader={(section) =>
            <View style={[styles.interactiveHeader]}>
              <TextInput placeholder={'Search...'} onChangeText={(text) => this.searchInvites({text})} style={{paddingHorizontal:10, borderWidth:1, borderColor: '#ccc', height:40, flex:1}}></TextInput>
              <TouchableHighlight><Icon onPress={this.closeModal}  name='close' style={{color: '#aaa', fontSize: 32, fontWeight: '700', textAlign: 'right', lineHeight:40, width:50}}/></TouchableHighlight>
            </View>
          }
          ListFooterComponent={() => {
              if (this.state.isLastPage) return (
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
                <Text style={{color:'#888', fontSize: 12}}>That's it!</Text>
               </View>
              );
              if (!this.state.loading) return (
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
          ItemSeparatorComponent = {() => <View style={{height: StyleSheet.hairlineWidth, width:'100%', backgroundColor: '#bbb'}}></View>}
        />
    );
  }
}

export default MyClass;