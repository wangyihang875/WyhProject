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
  Alert,TouchableOpacity
} from 'react-native';
import Login from './login';
class Center extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    logoutHandler(){
        storage.remove({
            key: 'loginState'
        });
        const {navigator} = this.props;
        navigator.replace({
            name:'login',
            component:Login,
            params:{

            }
        });
    }

  render(){
      return (
        <View style={styles.contains}>
            <View style={styles.titleBar}>
                <Text style={styles.titleBarText}>个人中心</Text>
            </View>
            <View style={styles.infoView}>
                <View style={styles.rowView}>
                    <Text>姓名</Text>
                    <Text>{this.props.realname}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text>医院</Text>
                    <Text>{this.props.hospitalName}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text>科室</Text>
                    <Text>{this.props.departmentName}</Text>
                </View>
                <View style={[styles.rowView,{borderBottomWidth:0}]}>
                    <Text>手机号码</Text>
                    <Text>{this.props.mobilephone}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={()=>this.logoutHandler()}>
                <Text style={styles.logoutText}>退出登录</Text>
            </TouchableOpacity>
        </View>
      );
  };
}

var styles=StyleSheet.create({
    contains:{
        flex:1,
        backgroundColor:'#ecf3fd'
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
    infoView:{
        backgroundColor:'#fff',
        marginTop:20,
        borderTopWidth:1,
        borderTopColor:'#e6e6e6',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    },
    rowView:{
        flexDirection:'row',
        marginLeft:20,
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        justifyContent:'space-between',
        paddingRight:20,
    },
    logoutBtn:{
        backgroundColor:'#62a2f3',
        marginTop:60,
        marginHorizontal:20,
        paddingVertical:10,
        borderRadius:8,
    },
    logoutText:{
        color:'#ffffff',
        fontSize:16,
        textAlign:'center'
    }

});
export default Center;
