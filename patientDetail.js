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
    Alert,
    ScrollView, TouchableOpacity
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import PatientDetailBaseinfo from './patientDetailBaseinfo';
import PatientDetailHistory from './patientDetailHistory';
import PatientDetailLifestyle from './patientDetailLifestyle';
import PatientDetailAllergy from './patientDetailAllergy';
class PatientDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {

    }

    render(){
        return (
            <View style={styles.contains}>
                <View style={styles.titleBar}>
                    <Text style={styles.titleBarText}>电子病历</Text>
                </View>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineColor = "#64a8ef"
                    tabBarBackgroundColor = "#fff"
                    tabBarActiveTextColor = "#64a8ef"
                    tabBarInactiveTextColor = "#757575"
                >
                    <PatientDetailBaseinfo {...this.props} tabLabel="基本信息"/>
                    <PatientDetailHistory {...this.props} tabLabel="既往史"/>
                    <PatientDetailLifestyle {...this.props} tabLabel="生活方式"/>
                    <PatientDetailAllergy {...this.props} tabLabel="药物过敏史"/>
                </ScrollableTabView>
            </View>
      );
    };
}

var styles=StyleSheet.create({
    contains:{
        flex:1,
        backgroundColor:'#ECF5FD'
    },
    titleBar:{
        backgroundColor:'#62a2f3',
        justifyContent:'center',
        alignItems:'center',
    },
    titleBarText:{
        color:'#ffffff',
        fontSize:20,
        paddingVertical:10
    },

});
export default PatientDetail;
