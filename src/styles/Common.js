import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({

	//GOLOCO SPECIFIC

	textBox: {
		backgroundColor: '#fff', height: 50, color:'#333'
	},

	offersBox: {
		backgroundColor: '#db4437',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: 140,
		height: 60,
		paddingHorizontal:10,
		marginRight: 20,
		shadowColor : '#666',
		shadowOpacity : 0.6,
		shadowRadius : 6,
		shadowOffset: {
			width: 0,
			height:3
		}		
	},
	offersText: {
		textAlign:'center', color:'#fff', fontSize:13, fontWeight: '600'
	},

	detailsRowContainer: {
		width:'100%', flexDirection: 'row', justifyContent:'flex-start', alignItems:'flex-start'
	},

	detailsRowIcon: {
		marginTop:2, fontSize: 14, textAlign:'center', color: '#db4437', width: 14, marginRight: 10,
	},

	detailsRowText: {
		color: '#333'
	},


	buttonPrimary: {
		backgroundColor: '#3f51b5', height: 60, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
	},
	
	// SEPARATORS
	verticalSeparatorMedium: {
		marginTop: 10
	},
	verticalSeparatorSmall: {
		marginTop: 5
	},
	verticalSeparatorLarge: {
		marginTop: 30
	},

	// CONTAINERS
	contextMenuItemBadge: {
		marginLeft:5, 
		backgroundColor: '#db4437',
		height: 18,
		width: 18,
		borderRadius: 9,
		right:0,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "column"
	},
	contextMenuItemBadgeText: {
		fontSize: 12,
		color: '#fff',
		fontWeight: 'bold'
	},


	// HEADERS
	listHeader: {
		width: '100%',
		paddingHorizontal: 14,
		backgroundColor: '#efefef',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: "row",
		height: 30
	},
	listHeaderTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#888',
	},
	listHeaderAction: {
		fontSize: 12,
		color: 'blue',
	},
	interactiveHeader: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: '#fafafa',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: "row",
		height: 80,
		shadowColor : '#666',
		shadowOpacity : 0.5,
		shadowRadius : 3,
		shadowOffset: {
			width: 0,
			height:1
		}
	},

	// ACTION-SHEET
	actionSheetCancelItem: {
		fontSize: 13,
		fontWeight: "600",
		color: '#777',
	},
	actionSheetDestructiveItem: {
		fontSize: 13,
		fontWeight: "600",
		color: '#777',
	},
	actionSheetItem: {
		fontSize: 13,
		fontWeight: "600",
		color: '#555',
	},
	actionSheetPrimaryItem: {
		fontSize: 14,
		fontWeight: "600",
		color: '#ff6961',
	},

	// MISC
	loadingMask: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingMaskDark: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingMaskLight: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},


	// BUTTONS
	button: {
		width: '100%',
		height: 40, 
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		backgroundColor: '#e6e6e6',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor : '#e6e6e6',
		shadowOpacity : 0.2,
		shadowRadius : 4,
		shadowOffset: {
			width: 0,
			height:1
		}
	},

	actionStyleButtonPrimary: {
	},
	actionStyleButton: {
		width: '100%',
		minHeight: 40,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#aaa',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	actionStyleButtonText: {
		fontSize: 13,
		fontWeight: "600",
		color: '#555',
	},
	actionStyleButtonSubText: {
		fontSize: 10,
		fontWeight: "600",
		color: '#555',
	},
});