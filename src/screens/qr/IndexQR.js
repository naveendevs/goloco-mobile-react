import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style as styles } from '../../styles/Common';

class MyClass extends React.Component {

  componentWillMount() {
    navigator = this.props.navigator;
    const to = 'hidden';
    this.props.navigator.toggleNavBar({to, animated: false});
  }

  cancelScan = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    return (
      <View style={stylesCustom.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={stylesCustom.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={{paddingVertical:30, backgroundColor: '#fafafa'}}>
            <View style={{marginBottom: 20, height:130, alignItems: 'center', flexDirection: 'column'}}>
              <Icon color="#ff6961" size={80} name="qrcode" />
              <Text style={styles.actionStyleButtonText, {textAlign: 'center', width: '100%', paddingHorizontal: 50}}>PLACE YOUR CAMERA IN FRONT OF QR CODE</Text>
            </View>
            <TouchableOpacity onPress={this.cancelScan}>
              <View style={[styles.actionStyleButton, styles.actionStyleButtonPrimary]}>
                <Text style={styles.actionStyleButtonText}>CANCEL</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture() {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

}

const stylesCustom = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default MyClass;
