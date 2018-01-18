import React from 'react';
import {StyleSheet, Image, View, Button, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Style as styles } from '../styles/Common';
import RNFetchBlob from 'react-native-fetch-blob'
import Base64 from 'base64-arraybuffer';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

class MyClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      cameraPictureTaken: false,
      cameraPictureSource: ''
    };

    this.takePicture = this.takePicture.bind(this);
    this.upload = this.upload.bind(this);
  }

  componentWillMount() {
    navigator = this.props.navigator;
    const to = 'hidden';
    this.props.navigator.toggleNavBar({to, animated: false});
    this.props.navigator.setStyle({
      statusBarHidden: true
    });

  }

  cancelScan = () => {
    this.props.navigator.dismissModal();
  }


  retake = () => {
    this.setState({
      cameraPictureTaken: false,
      cameraPictureSource: ''
    })
  }

  render() {
    return (
      <View style={stylesCustom.container}>

        { !this.state.cameraPictureTaken &&
        <View style={stylesCustom.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={stylesCustom.preview}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}
            flashMode={Camera.constants.FlashMode.auto}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            defaultTouchToFocus
            >
          </Camera>
          <Icon onPress={this.cancelScan} name='close' style={{position:'absolute', top:10, right:19, backgroundColor:'transparent', color: '#fff', fontSize: 32, fontWeight: '300'}}/>

          <View style={{position:'absolute', bottom:20, left:0, right: 0, backgroundColor:'transparent', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
            <Icon onPress={this.takePicture} name='circle-o' style={{color: '#fff', fontSize: 60}}/>
          </View>
        </View>
        }

        { this.state.cameraPictureTaken &&
        <View style={stylesCustom.container}>
          <Image source={{uri: this.state.cameraPictureSource, isStatic: true}} style={{flex: 1}} />
          
          <TouchableOpacity onPress={this.upload} style={{position:'absolute', bottom:100, left:50, right: 50, backgroundColor:'transparent', flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingHorizontal:15, paddingVertical:10, borderRadius: 10, borderWidth:3, borderColor:'#fff'}}>
            <Text style={{color:'#fff', fontSize:22, fontWeight:'700'}}>UPLOAD</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.retake} style={{position:'absolute', bottom:30, left:50, right: 50, backgroundColor:'transparent', flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingHorizontal:15, paddingVertical:10, borderRadius: 10, borderWidth:3, borderColor:'#fff'}}>
            <Text style={{color:'#fff', fontSize:22, fontWeight:'700'}}>RETAKE</Text>
          </TouchableOpacity>
        </View>
        }

        { this.state.uploading &&
            <View style={stylesCustom.loading}>
              <ActivityIndicator size='large' />
            </View>
        }        

      </View>
    );
  }

  takePicture() {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        this.setState({ 
          cameraPictureTaken: true,
          cameraPictureSource: data.path
        });
      })
      .catch(err => console.error(err));
  }

  upload = () => {
    this.setState({uploading: true});
    var albumBucketName = 'goloco-images';
    var bucketRegion = 'ap-south-1';
    var IdentityPoolId = 'ap-south-1:eae5306d-f40c-4020-81f4-5ad05711e0ca';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    let arr = this.state.cameraPictureSource.split('/');
    const dirs = RNFetchBlob.fs.dirs;
    filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`;

    RNFetchBlob.fs.readFile(filePath, 'base64')
    .then((imageBase64Data) => {
      var array = Base64.decode(imageBase64Data);
      var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'ap-south-1'});
      var params = {
        Bucket: 'goloco-images',
        Key: 'invoices/' + this.props.gatePass.golocoEvent.golocoLocation.id + '/' + this.props.gatePass.golocoEventPassId.golocoEventId +'/'+ this.props.gatePass.golocoEventPassId.golocoUserId +'.jpg',
        Body: array,
        ACL: 'public-read',
        ContentType: 'image/jpg'
      };

      var putObjectPromise = s3.putObject(params).promise();
      putObjectPromise.then(function(data) {
        this.setState({uploading: false});

        //update gate pass status

        var s3UploadURL = 'https://s3.ap-south-1.amazonaws.com/goloco-images/invoices/' + this.props.gatePass.golocoEvent.golocoLocation.id + '/' + this.props.gatePass.golocoEventPassId + '/' + this.props.gatePass.golocoUserId + '.jpg'

        const url = 'http://goloco-prod.ap-south-1.elasticbeanstalk.com/goloco/event/postbillimage?billImageUrl='+ encodeURIComponent(s3UploadURL) +'&eventId=' + this.props.gatePass.golocoEventPassId.golocoEventId;
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
          this.cancelScan();
          this.props.uploadCallback(s3UploadURL);
        })
        .catch(error => {
        });

      }.bind(this)).catch(function(err) {
        this.setState({uploading: false});
      }.bind(this));
    })
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
  loading: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',    
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
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
