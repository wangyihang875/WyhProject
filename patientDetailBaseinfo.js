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
    ScrollView
} from 'react-native';
class patientDetailBaseinfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfoJson: {}
        }
    }

    componentWillMount() {
        fetch('http://disedc.cxjky.com/interface/getMedicalRecords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': 'FnureEYnavbeGhlUVnyfww==',
            },
            body: "idcard="+this.props.idcard
        }).then(
            (response) =>response.json()
        ).then((responseJson) => {
            if(responseJson.data.msg==="0000"){
                let userInfoJson = responseJson.data.userInfo;
                this.setState({
                    "userInfoJson":userInfoJson
                });
            }else{
                toastShort('服务器返回错误status='+responseJson.data.msg);
            }
        }).catch((error) => {
            alert("error:"+error);
        });
    }

    render(){
        return (
            <View style={styles.contains}>
                <ScrollView>
                <View style={styles.infoView}>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>姓名</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.name}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>性别</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.sex}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>出生日期</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.birthday}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>民族</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.nation}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>医保方式</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.healthWay}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>购药方式</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.buyMedicineWay}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>服药依从性</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.medicineCompliance}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>手机号码</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.phone}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>家庭电话</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.familyPhone}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>身份证号</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.idcard}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>户籍地址</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.censusAddress}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>现住地址</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.address}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>常驻类型</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.permanentType}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>婚姻状况</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.marriage}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>文化程度</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.diploma}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>职业</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.job}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>工作单位</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.jobStatus}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>血型</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.bloodType}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>RH阴性</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.rh}</Text>
                    </View>
                    <View style={styles.lineView}>
                        <Text style={styles.keyText}>医疗费用支付方式</Text>
                        <Text style={styles.valueText}>{this.state.userInfoJson.payWay}</Text>
                    </View>

                </View>
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
    infoView:{
        flex:1,
        marginTop:30,
        backgroundColor:'#fff',
    },
    lineView:{
        flexDirection:"row",
        marginLeft:20,
        borderBottomWidth:1,
        borderBottomColor:"#c9c9c9",
        paddingVertical:10,
        justifyContent:"space-around",
    },
    keyText:{
        flex:1,
        color:"#727272",
        fontSize:16
    },
    valueText:{
        flex:1,
        color:"#505050",
        fontSize:16
    },
});
export default patientDetailBaseinfo;
