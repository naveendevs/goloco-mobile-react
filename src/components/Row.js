import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Row({title, subtitle, rightText, iconPos, badgeText, height, badgeColor, icon, iconColor, actionIcon, onPress, multiline}) {
  return (
	    <TouchableOpacity style={[styles.itemContainer, {height: height}]} onPress={onPress} activeOpacity={0.7}>
			{ icon &&
				<View style={[styles.itemIconContainer, {justifyContent: iconPos ? iconPos : 'center'}]}>
					<Icon style={styles.itemIcon} name={icon} color={iconColor}/>
				</View>
			}

			<View style={styles.itemContentContainer}>
				<View style={styles.itemTitleContainer}>
					{multiline &&
					<Text style={styles.itemTitle}>{title}</Text>
					}
					{!multiline &&
					<Text numberOfLines={1} style={styles.itemTitle}>{title}</Text>
					}
					{ badgeText &&
					<View style={styles.itemBadge}>
						<Text style={styles.itemBadgeText}>{badgeText}</Text>
					</View>
					}
				</View>
				{ subtitle &&
				<Text style={styles.itemSubtitle}>{subtitle}</Text>
				}
			</View>

			{ rightText &&
				<View style={styles.itemValueContainer}>
					<Text style={styles.itemValue}>{rightText}</Text>
				</View>
			}

			{ actionIcon &&
				<View style={styles.itemValueContainer}>
					<Icon style={styles.itemAction} name="ellipsis-v" />
				</View>
			}
		</TouchableOpacity>
  );
}

Row.propTypes = {
	// TODO: Add required props
	title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
	itemContainer: {
		minHeight: 50,
		paddingHorizontal:10,
		paddingVertical:10,
		flexDirection: "row",
		width: '100%',
	},
	itemContentContainer: {
		flex:1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: "column",
	},
	itemTitle: {
		fontSize: 14,
		color: "#333",
		fontWeight: '500'
	},
	itemSubtitle: {
		paddingTop: 3,
		fontSize: 10,
		color: "#666"
	},
	itemIcon: {
		width:26,
		marginRight:10,
		fontSize:20,
		textAlign: 'center',
	},
	itemIconContainer: {
		paddingVertical:2,
		justifyContent: 'center',
		flexDirection: "column",
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
	}
});

export default Row;