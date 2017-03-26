/**
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert
} from 'react-native';

let totalWidth = Dimensions.get('window').width;
let leftStartPonit = totalWidth*0.1;
let componentWidth = totalWidth*0.8;
class Test1 extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
      return (
        <View style={styles.contains}>
            <Text>1111111111111</Text>
        </View>
      );
  };
}

var styles=StyleSheet.create({

    contains:{
          flex:1,
          backgroundColor:'white'
    },

});
export default Test1;
