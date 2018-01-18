import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, TouchableHighlight, Platform, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class InvitesItem extends React.Component {

  	constructor(props) {
    	super(props);
    	this.state = {
    		loading: false,
    		status: props.status
    	}
	}

	_approveAction = () => {
		this.setState({loading: true});
		this.props.approveAction(this.props.phone, (returnStatus)=>this.setState({
			loading: false,
			status: returnStatus
		}))
	}

	_rejectAction = () => {
		this.setState({loading: true});
		this.props.rejectAction(this.props.phone, (returnStatus)=>this.setState({
			loading: false,
			status: returnStatus
		}))
	}

	render() {
    return (
		<View style={[styles.profileContainer]}>
			<Image style={styles.profileImage} source={{uri: this.props.imageURL}} />
			<View style={styles.profileNameContainer}>
				<Text style={styles.profileName}>{this.props.name}</Text>
				<Text style={styles.profileEmail}>{this.props.email}</Text>
				<Text style={styles.profileEmail}>{this.props.phone}</Text>
				<Text style={styles.profileEmail}>{this.props.createdAt}</Text>
			</View>
	  		
	  		{ (this.state.status != 'APPROVED' && this.state.status != 'DENIED') &&
	  		<View style={{flexDirection: 'row'}}>
			<Icon onPress={this._rejectAction}  name='close' style={{backgroundColor:'#ff6961', color: '#fff', fontSize: 32, fontWeight: '700', textAlign: 'center', lineHeight:60, width:50}}/>
			<Icon onPress={this._approveAction} name='check' style={{backgroundColor:'#54b2a9', color: '#fff', fontSize: 32, fontWeight: '700', textAlign: 'center', lineHeight:60, width:50, marginLeft:5}}/>
			</View>
  			}

	  		{ (this.state.status == 'APPROVED') &&
	  		<Text style={{flexDirection:'row', color: '#54b2a9', fontSize: 18, fontWeight: '700', textAlign: 'center', lineHeight:60}}>
	  			APPROVED
			</Text>
  			}

	  		{ (this.state.status == 'DENIED') &&
	  		<Text style={{flexDirection:'row', color: '#ff6961', fontSize: 18, fontWeight: '700', textAlign: 'center', lineHeight:60}}>
	  			DENIED
			</Text>
  			}

  			{ this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>
        	}
    	</View>
    )};
}

const styles = StyleSheet.create({
  container: {
  },
  profileContainer: {
    paddingHorizontal:20,
    paddingVertical:10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: "row",
  },
  loading: {
  	backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  profileName: {
    fontSize: 18,
    color: "#333"
  },
  profileEmail: {
    fontSize: 10,
    color: "#666"
  },
  profileNameContainer: {
    height: 60,
    flex:1,
    paddingLeft:10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: "column",
  },
  profileImage: {
      backgroundColor: "#ccc",
      borderRadius: 30,
      width:60,
      height: 60,
  }
});

export {InvitesItem};