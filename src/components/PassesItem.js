import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Platform, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Row({title, image, subitems, status, height, actionIcon, onPress, multiline}) {
  return (
  		<View style={{paddingHorizontal:20}}>
	    
		    <TouchableOpacity style={[styles.itemContainer]} onPress={onPress} activeOpacity={0.9}>
				<View style={{width:'60%', height:160, borderRadius:10, borderWidth:0}}>
					<Image style={styles.itemImage} source={{uri: image}} />
					<View style={{position: 'absolute', backgroundColor:'transparent', top:0, bottom:0, left:0, right:0, padding: 20, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
						<Icon name="check-circle-o" style={[styles.shadow, styles.itemTitle, {color:'#fff', fontSize:46, fontWeight:'500'}]}/>
						<Text style={[styles.shadow, styles.itemSubtitle]}>CHECKED-IN</Text>
						<View style={{marginVertical:10, borderTopWidth:1, borderColor:'#ffffffcc', width:'100%'}}/>
						<Text style={[styles.shadow, styles.itemTitle, {textAlign:'center'}]}>{title}</Text>
						<Text style={[styles.shadow, styles.itemSubtitle]}>{subitems.location}</Text>
					</View>
				</View>

				<View style={{width:'40%', height:160, borderRadius:10, borderWidth:0, padding:20, backgroundColor:'#3f51b5', flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>

					<View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
						<Text style={[styles.passLabel]}>EVENT STATUS</Text>
						<Text style={[styles.passValue]}>UPCOMING</Text>
					</View>

					<View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'center', marginTop:5}}>
						<Text style={[styles.passLabel]}>EVENT DATE</Text>
						<Text style={[styles.passValue]}>TOMORROW</Text>
					</View>

					<View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'center', marginTop:5}}>
						<Text style={[styles.passLabel]}>EVENT STATUS</Text>
						<Text style={[styles.passValue]}>UPCOMING</Text>
					</View>


					<View style={{width:1, height:160, borderWidth:1, borderStyle:'dashed', borderColor:'#ffffffaa', position:'absolute', top:0, left:-1}}>
					</View>
				</View>

			</TouchableOpacity>

			{false &&
		    <TouchableOpacity style={[styles.itemContainer, {flexDirection:'row', justifyContent:'center', alignItems:'center' ,backgroundColor: '#3f51b5', height: 50}]} onPress={onPress} activeOpacity={0.7}>
				<View style={[styles.itemTitleContainer]}>
					<Text style={{color:'#eee', fontWeight: '700'}}>CHECK IN</Text>
				</View>
			</TouchableOpacity> 
			}
	    
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
		fontSize: 20,
		color: "#fafafa",
		fontWeight: '700'
	},
	itemSubtitle: {
		paddingTop: 3,
		fontSize: 11,
		fontWeight: '600',
		color: "#fafafa"
	},

	passLabel: {
		fontSize: 8,
		fontWeight: '600',
		color: "#ffffff77"
	},
	passValue: {
		fontSize: 12,
		fontWeight: '600',
		color: "#ffffffcc"
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
      resizeMode: Image.resizeMode.fit,
      width: '100%',
      height: 160,
	  borderRadius:10, 
	  borderWidth:0
	}	
});

export default Row;