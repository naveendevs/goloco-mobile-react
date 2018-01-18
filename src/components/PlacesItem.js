import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Platform, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Row({title, image, subitems, status, height, actionIcon, onPress, multiline}) {
  return (
  		<View style={{paddingHorizontal:20}}>
	    
		    <TouchableOpacity style={[styles.itemContainer]} onPress={onPress} activeOpacity={0.9}>
				<View style={{width:'100%'}}>
					<Image style={styles.itemImage} source={{uri: image}} />
				</View>

				<View style={{position:'absolute', bottom:6, left:10}}>
		            <Text style={[styles.shadow, {backgroundColor:'transparent', color: '#fff', fontSize: 18, fontWeight: '700'}]}>
		              {title}
		            </Text>
		            <View style={{marginLeft:2, marginTop:2, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', backgroundColor:'transparent'}}>
						<Icon name="map-marker" color='#fff' style={[styles.shadow]}/>
			            <Text style={[styles.shadow, {marginLeft:4, backgroundColor:'transparent', color: '#fff', fontSize: 13, fontWeight: '500'}]}>
			              {subitems.location}
			            </Text>
		            </View>
	            </View>

				<View style={{position:'absolute', right:0, bottom:6, width: 100, paddingRight:10, flexDirection:'row', justifyContent:'flex-end'}}>
		            { false && 
		            <View style={{marginRight:10, flexDirection:'column', justifyContent:'flex-start', alignItems:'center', backgroundColor:'transparent'}}>
			            <Text style={[styles.shadow, {backgroundColor:'transparent', color: '#fff', fontSize: 22, fontWeight: '700'}]}>
			              {subitems.checkinCount}
			            </Text>
			            <Text style={[styles.shadow, {backgroundColor:'transparent', color: '#fff', fontSize: 8, fontWeight: '600'}]}>
			            CHECKINS
			            </Text>
						<Icon name="check-circle" color='#fff' style={[styles.shadow, {marginTop:3, fontSize: 22, fontWeight: '700'}]}/>
					</View>
					}

		            <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', backgroundColor:'transparent'}}>
			            <Text style={[styles.shadow, {backgroundColor:'transparent', color: '#fff', fontSize: 22, fontWeight: '700'}]}>
			              {subitems.offersCount}
			            </Text>
			            <Text style={[styles.shadow, {backgroundColor:'transparent', color: '#fff', fontSize: 8, fontWeight: '600'}]}>
			            OFFERS
			            </Text>
						<Icon name="tag" color='#fff' style={[styles.shadow, {marginTop:3, fontSize: 22, fontWeight: '700'}]}/>
					</View>
	            </View>
			</TouchableOpacity>

		    <TouchableOpacity style={[styles.itemContainer, {flexDirection:'row', justifyContent:'center', alignItems:'center' ,backgroundColor: '#3f51b5', height: 50}]} onPress={onPress} activeOpacity={0.7}>
				<View style={[styles.itemTitleContainer]}>
					<Text style={{color:'#eee', fontWeight: '700'}}>GET GATE PASS</Text>
				</View>
			</TouchableOpacity>
	    
	    </View>
  );
}

Row.propTypes = {
	title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor : '#000',
		shadowOpacity : 1,
		shadowRadius : 3,
		shadowOffset: {
			width: 1,
			height:1
		}
	},
	itemContainer: {
		flexDirection: 'row',
		flex:1,
	},
	itemTitle: {
		fontSize: 16,
		color: "#fafafa",
		fontWeight: '700'
	},
	itemSubtitle: {
		paddingTop: 3,
		fontSize: 11,
		fontWeight: '600',
		color: "#fafafa"
	},
	itemIcon: {
		width:10,
		fontSize:12,
		textAlign: 'center',
		marginRight: 8
	},
	itemIconContainer: {
      width:80,
      height: 120,
		shadowColor : '#666',
		shadowOpacity : 0.15,
		shadowRadius : 8,
		shadowOffset: {
			width: 10,
			height:10
		}
	},
	itemValueContainer: {
		justifyContent: 'center',
		flexDirection: "column",
	},
	itemValue: {
		fontSize:14,
		textAlign: 'right',
		fontWeight: '500',
		color: '#333'
	},
	itemAction: {
		color: '#aaa',
		width:24,
		fontSize:24,
		textAlign: 'right',
	},
	itemBadge: {
		marginLeft:5, 
		backgroundColor: '#ff6961',
		height: 18,
		borderRadius: 9,
		right:0,
		paddingHorizontal: 6,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "column"
	},
	itemBadgeText: {
		fontSize: 10,
		color: '#fff',
		fontWeight: 'bold'
	},
	itemTitleContainer: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: "row"
	},
  	itemImage: {
      backgroundColor: "#ccc",
      resizeMode: Image.resizeMode.cover,
      width: '100%',
      height: 140,
	}	
});

export default Row;