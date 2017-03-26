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
  Alert, Image,TouchableOpacity, ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PatientList from './patientList';
import PatientAdd from './patientAdd';
import Test3 from './test3';
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
class BottomNavigator extends Component{
    constructor(props) {
        super(props);
        this.state={
            selectedTab:"患者列表"
        }
    }

    render(){
        return (
            <View style={styles.container} >
                <TabNavigator >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '患者列表'}
                        title="患者列表"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/list.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./image/list_pressed.png")} />}
                        onPress={() => this.setState({ selectedTab: '患者列表' })}>
                        <PatientList {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '添加患者'}
                        title="添加患者"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/peoples.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./image/peoples_pressed.png")} />}
                        onPress={() => this.setState({ selectedTab: '添加患者' })}>
                        <PatientAdd />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '个人中心'}
                        title="个人中心"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/center.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./image/center_pressed.png")} />}
                        onPress={() => this.setState({ selectedTab: '个人中心' })}>
                        <Test3 />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    };
}

var styles=StyleSheet.create({
    tabText: {
        color: "#999999",
        fontSize: 13
    },
    selectedTabText: {
        color: "#000000",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20
    },
    container: {
        flex: 1
    }

});
export default BottomNavigator;
