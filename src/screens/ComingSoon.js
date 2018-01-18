import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';


closeThis = () => {
  this.props.navigator.dismissModal();
}

class MyClass extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Coming Soon...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});

export default MyClass;
