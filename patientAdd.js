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
    Alert,
    ScrollView, TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import DatePicker from 'react-native-datepicker'
import {toastShort} from './utils/ToastUtil';
let totalWidth = Dimensions.get('window').width;
let leftStartPonit = totalWidth*0.1;
let componentWidth = totalWidth*0.8;

class PatientAdd extends Component{
  constructor(props) {
    super(props);
    this.state = {
        manCheck:true,
    };
  }

    _onPressSave(){
        let sex = this.state.manCheck?'男':'女'
        let name = this.state.patientName;
        let birth = this.state.date;

        if(name===undefined||name.trim()===""){
            toastShort('请输入姓名');
            return;
        }
        if(birth===undefined||name.trim()===""){
            toastShort('请选择出生日期');
            return;
        }
        alert(`姓名:${name}
性别:${sex}
生日:${birth}`);
    }

  render(){
      return (
        <View style={styles.contains}>
            <View style={styles.titleBar}>
                <Text style={styles.titleBarText}>添加患者</Text>
            </View>
            <ScrollView>
                <View style={styles.info}>
                    <View style={styles.titleLine}>
                        <Text style={styles.infoTitleText}>信息填写</Text>
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>姓名</Text>
                        <TextInput onChangeText={(msg)=>this.setState({patientName:msg})} placeholder={'请输入姓名'} placeholderTextColor="#A9A9A9" style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>性别</Text>
                        <View style={styles.sexCheckbox}>
                            <CheckBox
                                label='男'
                                checked={this.state.manCheck}
                                onChange={(checked) => {
                                 this.setState({manCheck:true});
                            }}
                            />
                            <CheckBox
                                label='女'
                                checked={!this.state.manCheck}
                                onChange={(checked) => {
                                this.setState({manCheck:false});
                            }}
                            />
                        </View>
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>出生日期</Text>
                        <DatePicker
                            style={{
                            width: 200,
                        }}
                            date={this.state.date}
                            mode="date"
                            placeholder="请选择日期"
                            format="YYYY-MM-DD"
                            minDate="1900-1-1"
                            maxDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                          dateInput: {
                              position:'absolute',
                              borderWidth:0,
                              right:0
                          },
                          placeholderText:{
                              color: '#A9A9A9',
                              fontSize:17,
                              paddingLeft:50,
                          },
                          dateText:{
                              fontSize:17,
                          },
                          dateTouchBody:{
                              height:58,
                              alignItems:'center',
                              justifyContent:'center'
                          }
                        }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>民族</Text>
                        <TextInput placeholder={'请输入名族'} placeholderTextColor="#A9A9A9" style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>手机号码</Text>
                        <TextInput placeholder={'请输入手机号码'} placeholderTextColor="#A9A9A9" style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>家庭电话</Text>
                        <TextInput placeholder={'请输入家庭电话'} placeholderTextColor="#A9A9A9" style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputLine}>
                        <Text style={styles.labelText}>身份证号</Text>
                        <TextInput placeholder={'请输入身份证号'} placeholderTextColor="#A9A9A9" style={styles.input}></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={()=>this._onPressSave()}>
                    <Text style={styles.saveBtnText}>保存</Text>
                </TouchableOpacity>
            </ScrollView>
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
        // flex:0.1,
        backgroundColor:'#62a2f3',
        justifyContent:'center',
        alignItems:'center',
    },
    titleBarText:{
        color:'#ffffff',
        fontSize:20,
        paddingVertical:10
    },
    info:{
        backgroundColor:'#ffffff',
        marginTop:20
    },
    infoTitleText:{
        fontSize:20,
        marginVertical:10,
        textAlign:'center',
    },
    titleLine:{
        borderBottomWidth:1,
        borderBottomColor:'#E3EAF2',
        alignItems:'center',
    },
    sexCheckbox:{
        flex:3,
        flexDirection:'row',
        alignItems:'center',
        height:58,
        justifyContent:'flex-end',
    },
    inputLine:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#E3EAF2',
        alignItems:'center',
        marginHorizontal:10,
    },
    labelText:{
        flex:1,
        fontSize:17,
        color:'#676767',
    },
    datePicker:{
        height:58,
        alignItems:'center'
    },
    input:{
        flex:3,
        textAlign:'right',
        fontSize:17,
        height:58
    },
    saveBtn:{
        backgroundColor:'#62a2f3',
        borderRadius:8,
        marginHorizontal:10,
        marginVertical:20
    },
    saveBtnText:{
        color:'#ffffff',
        alignSelf:'center',
        fontSize:16,
        paddingVertical:8
    },


});
export default PatientAdd;
