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
class patientDetailLifestyle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lifeStyleJson: {}
        };
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
                let lifeStyleJson = responseJson.data.lifeStyle;
                this.setState({
                    "lifeStyleJson":lifeStyleJson
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
                    <View style={styles.titleView}>
                        <Text style={styles.colnameLeftText}>锻炼情况</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>锻炼频率</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.exerciseFrequency}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>每次锻炼时间(分钟)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.eachExerciseTime}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>坚持锻炼时间(年)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.adhereToExerciseTime}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>锻炼方式</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.exerciseMethod}</Text>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.colnameLeftText}>饮食情况</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>饮食习惯</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.foodHabits}</Text>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.colnameLeftText}>吸烟情况</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>吸烟状况</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.smokingStatus}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>日吸烟量(支/平均)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.daySmoking}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>开始吸烟年龄(岁)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.startSmokingAge}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>戒烟年龄(岁)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.quitSmokingAge}</Text>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.colnameLeftText}>饮酒情况</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>饮酒频率</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.drinkingFrequency}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>日饮酒量(两/平均)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.dayDrinking}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>是否戒酒</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.isQuitDrinking}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>戒酒年龄(岁)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.quitDrinkingAge}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>开始饮酒年龄(岁)</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.startDrinkingAge}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>近1年是否曾醉酒</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.isYearDrunk}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemLeftText}>饮酒种类</Text>
                        <Text style={styles.itemRightText}>{this.state.lifeStyleJson.drinkingType}</Text>
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
    titleView:{
        backgroundColor:'#ecf3fd',
        flexDirection:'row',
        paddingVertical:6,
    },
    colnameLeftText:{
        flex:3,
        color:'#9fc5f6',
        fontSize:16,
        marginLeft:20
    },
    itemView:{
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:'#a6acb6',
    },
    itemLeftText:{
        flex:3,
        color:'#555962',
        fontSize:16,
        marginLeft:20
    },
    itemRightText:{
        flex:2,
        color:'#555962',
        fontSize:16,
        textAlign:'center',
    },
});
export default patientDetailLifestyle;
