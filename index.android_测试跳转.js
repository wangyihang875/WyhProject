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
  Navigator,
  BackAndroid
} from 'react-native';

import RegistryLeaf from './registryLeaf';

class NaviModule extends Component{

  configureScene(route){
    return Navigator.SceneConfigs.VerticalDownSwipeJump;
  }

  renderScene(route,navigator){
    let Component = route.component;
    return <Component {...route.params} navigator={navigator} />
  }

  componentDidMount() {
    var navigator = this.refs.navigator;
    BackAndroid.addEventListener('NaviModuleListener',()=>{
      if(navigator && navigator.getCurrentRoutes().length > 1){
        navigator.pop();
        return true;
      }
      return false;
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('NaviModuleListener');
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{name:'registryLeaf',component: RegistryLeaf}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    );
  }
}



AppRegistry.registerComponent('WyhProject',()=>NaviModule);
