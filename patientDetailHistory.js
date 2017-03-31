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
    ScrollView, ListView
} from 'react-native';
class patientDetailHistory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            diseaseDataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            surgeryDataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            traumaDataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            bloodDataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            diseaseList:[],
            surgeryList:[],
            traumaList:[],
            bloodList:[],
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
                let pastHistoryJson = responseJson.data.pastHistory;
                let diseaseJsonArr = pastHistoryJson.disease;
                let surgeryJsonArr = pastHistoryJson.surgery;
                let traumaJsonArr = pastHistoryJson.trauma;
                let bloodJsonArr = pastHistoryJson.blood;
                for(let i=0;i<diseaseJsonArr.length;i++){
                    this.state.diseaseList.push(diseaseJsonArr[i]);
                }
                this.setState({
                    diseaseDataSource:this.state.diseaseDataSource.cloneWithRows(this.state.diseaseList),
                });
                for(let i=0;i<surgeryJsonArr.length;i++){
                    this.state.surgeryList.push(surgeryJsonArr[i]);
                }
                this.setState({
                    surgeryDataSource:this.state.surgeryDataSource.cloneWithRows(this.state.surgeryList),
                });
                for(let i=0;i<traumaJsonArr.length;i++){
                    this.state.traumaList.push(traumaJsonArr[i]);
                }
                this.setState({
                    traumaDataSource:this.state.traumaDataSource.cloneWithRows(this.state.traumaList),
                });
                for(let i=0;i<bloodJsonArr.length;i++){
                    this.state.bloodList.push(bloodJsonArr[i]);
                }
                this.setState({
                    bloodDataSource:this.state.bloodDataSource.cloneWithRows(this.state.bloodList),
                });
            }else{
                toastShort('服务器返回错误status='+responseJson.data.msg);
            }
        }).catch((error) => {
            alert("error:"+error);
        });
    }
    _diseaseRenderRow = (rowData,sectionID,rowID)=>{
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemLeftText}>{rowData.diseaseName}</Text>
                <Text style={styles.itemRightText}>{rowData.confirmedTime}</Text>
            </View>
        )
    }
    _surgeryRenderRow = (rowData,sectionID,rowID)=>{
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemLeftText}>{rowData.surgeryName}</Text>
                <Text style={styles.itemRightText}>{rowData.surgeryTime}</Text>
            </View>
        )
    }
    _traumaRenderRow = (rowData,sectionID,rowID)=>{
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemLeftText}>{rowData.traumaName}</Text>
                <Text style={styles.itemRightText}>{rowData.traumaTime}</Text>
            </View>
        )
    }
    _bloodRenderRow = (rowData,sectionID,rowID)=>{
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemLeftText}>{rowData.bloodName}</Text>
                <Text style={styles.itemRightText}>{rowData.bloodTime}</Text>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.contains}>
                <ScrollView>
                <View style={styles.titleView}>
                    <Text style={styles.colnameLeftText}>疾病</Text>
                    <Text style={styles.colnameRightText}>确诊日期</Text>
                </View>
                {this.state.diseaseList.length==0?
                    <View style={styles.nullView}><Text style={styles.nullText}>暂无数据!</Text></View>:
                    <ListView dataSource={this.state.diseaseDataSource} renderRow={this._diseaseRenderRow} />}

                <View style={styles.titleView}>
                    <Text style={styles.colnameLeftText}>手术</Text>
                    <Text style={styles.colnameRightText}>手术日期</Text>
                </View>
                {this.state.surgeryList.length==0?
                    <View style={styles.nullView}><Text style={styles.nullText}>暂无数据!</Text></View>:
                    <ListView dataSource={this.state.surgeryDataSource} renderRow={this._surgeryRenderRow} />}
                <View style={styles.titleView}>
                    <Text style={styles.colnameLeftText}>外伤</Text>
                    <Text style={styles.colnameRightText}>外伤日期</Text>
                </View>
                {this.state.traumaList.length==0?
                    <View style={styles.nullView}><Text style={styles.nullText}>暂无数据!</Text></View>:
                    <ListView dataSource={this.state.traumaDataSource} renderRow={this._traumaRenderRow} />}
                <View style={styles.titleView}>
                    <Text style={styles.colnameLeftText}>输血</Text>
                    <Text style={styles.colnameRightText}>输血日期</Text>
                </View>
                {this.state.bloodList.length==0?
                    <View style={styles.nullView}><Text style={styles.nullText}>暂无数据!</Text></View>:
                    <ListView dataSource={this.state.bloodDataSource} renderRow={this._bloodRenderRow} />}
                </ScrollView>
            </View>
      );
    };
}

var styles=StyleSheet.create({
    contains:{
        flex:1,
        backgroundColor:'#ECF5FD',
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
    colnameRightText:{
        flex:2,
        color:'#494d56',
        fontSize:16,
        textAlign:'center',
    },
    itemView:{
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingVertical:12,
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
    nullView:{
        backgroundColor:'#fff',
        paddingVertical:6,
        justifyContent:'center',
        alignItems:'center'
    },
    nullText:{
        color:'#555962',
        fontSize:16,
        textAlign:'center',
    },
});
export default patientDetailHistory;
