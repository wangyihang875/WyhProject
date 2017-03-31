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
  Alert, Image,TouchableOpacity
} from 'react-native';
import Md5Util from './utils/Md5Util';
import {toastShort} from './utils/ToastUtil';
// import PatientList from './patientList';
import BottomNavigator from './bottomNavigator';
let totalWidth = Dimensions.get('window').width;
let leftStartPonit = totalWidth*0.1;
let componentWidth = totalWidth*0.8;
class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      inputedNum:"admin",
      inputedPwd:"123456",
    };
  }

  updateNum(msg){
    this.setState({
      inputedNum:msg,
    });
  }

  updatePwd(msg){
    this.setState({
      inputedPwd:msg,
    });
  }

    loginHandler(){
        if(this.state.inputedNum.trim()===""||this.state.inputedNum===null||this.state.inputedPwd===""||this.state.inputedPwd===null){
            toastShort('用户名和密码不能为空');
            return;
        }

        var md5Pwd = Md5Util.hex_md5(this.state.inputedPwd);
        fetch('http://disedc.cxjky.com/interface/getDocInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token':'FnureEYnavbeGhlUVnyfww==',
            },
            body: "username=" + this.state.inputedNum + "&password=" + md5Pwd
        }).then(
            (response) => response.json()
        ).then((responseJson) => {
            if(responseJson.data.msg==="0000"){
                toastShort('登录成功');
                const {navigator} = this.props;
                navigator.replace({
                    name:'bottomNavigator',
                    component:BottomNavigator,
                    params:{
                        departmentno:responseJson.data.departmentno,
                        realname:responseJson.data.realname,
                        mobilephone:responseJson.data.mobilephone,
                        hospitalName:responseJson.data.hospitalName,
                        departmentName:responseJson.data.departmentName,
                    }
                });
            }else if(responseJson.data.msg==="0003"){
                toastShort('接口没有权限');
            }else if(responseJson.data.msg==="0002"){
                toastShort('用户不存在或密码错误');
            }else{
                toastShort('登录失败 msg='+responseJson.data.msg);
            }
        }).catch((error) => {
            alert(error);
        });

        // const {navigator} = this.props;
        // navigator.push({
        //     name:'patientList',
        //     component:PatientList
        // });
    }

  render(){
      return (
        <View style={styles.contains}>
            <Text style={styles.title}>慢病一体化管理系统</Text>
            <Text style={styles.titleEn}>－Chronic Disease Integrated Management System－</Text>
            <View style={styles.inputView}>
                <Image source={require('./image/people.png')} style={styles.imagePeople}/>
                <TextInput style={styles.inputUser} placeholder={"请输入用户名"} underlineColorAndroid="transparent" value={this.state.inputedNum} onChangeText={(msg)=>this.updateNum(msg)}></TextInput>
            </View>
            <View style={styles.inputView}>
                <Image source={require('./image/lock.png')} style={styles.imageLock}/>
                <TextInput style={styles.inputPwd} placeholder={"请输入密码"} underlineColorAndroid="transparent" value={this.state.inputedPwd} secureTextEntry={true} onChangeText={(msg)=>this.updatePwd(msg)}></TextInput>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>this.loginHandler()}>
                <Text style={styles.loginText}>登   录</Text>
            </TouchableOpacity>
        </View>
      );
  };
}

var styles=StyleSheet.create({
  contains:{
      flex:1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
  },
  title:{
      fontSize:35,
      color:'#6E82B9',
  },
  titleEn:{
      fontSize:13,
      color:'#6E82B9',
  },
  inputUser:{
      width:totalWidth*0.8,
      marginTop:50,
  },
  inputPwd:{
      width:totalWidth*0.8,
  },
  inputView:{
      flexDirection:'row',
      borderBottomColor:'#6E82B9',
      borderBottomWidth:1
  },
  imagePeople:{
     width:16,
     height:16,
     marginTop:70,
  },
  imageLock:{
      width:16,
      height:16,
      marginTop:20,
  },
    loginBtn:{
        backgroundColor:'#62a2f3',
        marginTop:30,
        width:totalWidth*0.8,
        height:40,
        borderRadius:8
    },
    loginText:{
        color:'#ffffff',
        alignSelf:'center',
        paddingTop:8,
        fontSize:16
    }
});
export default Login;
