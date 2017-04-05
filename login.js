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
  Alert, Image,TouchableOpacity,AsyncStorage
} from 'react-native';
import Md5Util from './utils/Md5Util';
import {toastShort} from './utils/ToastUtil';
import BottomNavigator from './bottomNavigator';
import Storage from 'react-native-storage';
let totalWidth = Dimensions.get('window').width;
let leftStartPonit = totalWidth*0.1;
let componentWidth = totalWidth*0.8;
global.storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24 *7,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
})
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

    componentWillMount() {
        storage.load({
            key: 'loginState',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            if(ret.isLogin){
                const {navigator} = this.props;
                navigator.replace({
                    name:'bottomNavigator',
                    component:BottomNavigator,
                    params:{
                        departmentno:ret.departmentno,
                        realname:ret.realname,
                        mobilephone:ret.mobilephone,
                        hospitalName:ret.hospitalName,
                        departmentName:ret.departmentName,
                    }
                });
            }
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            //alert("没找到数据: "+err.message);
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

                // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
                // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
                storage.save({
                    key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
                    rawData: {
                        isLogin: true,
                        departmentno:responseJson.data.departmentno,
                        realname:responseJson.data.realname,
                        mobilephone:responseJson.data.mobilephone,
                        hospitalName:responseJson.data.hospitalName,
                        departmentName:responseJson.data.departmentName,
                    },

                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    // expires: 1000 * 3600
                });


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
