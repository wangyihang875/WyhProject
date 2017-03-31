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
    ScrollView, TouchableOpacity, ListView
} from 'react-native';
class patientDetailAllergy extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allergyDataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            allergyList:[],
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
                let allergyJsonArr = responseJson.data.drugAllergyHistory;
                for(let i=0;i<allergyJsonArr.length;i++){
                    this.state.allergyList.push(allergyJsonArr[i]);
                }
                this.setState({
                    allergyDataSource:this.state.allergyDataSource.cloneWithRows(this.state.allergyList),
                });
            }else{
                toastShort('服务器返回错误status='+responseJson.data.msg);
            }
        }).catch((error) => {
            alert("error:"+error);
        });
    }

    _allergyRenderRow = (rowData,sectionID,rowID)=>{
        return (
            <View style={styles.itemView}>
                <View style={styles.row1View}>
                    <Text style={styles.row1col1Text}>过敏药物</Text>
                    <Text style={styles.row1col2Text}>{rowData.allergyDrugName}</Text>
                    <Text style={styles.row1col3Text}>{rowData.allergyTime}</Text>
                </View>
                <View style={styles.row2View}>
                    <Text style={styles.row2col1Text}>备注</Text>
                    <Text style={styles.row2col2Text}>{rowData.allergyRemark}</Text>
                </View>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.contains}>
                <ScrollView>
                    <ListView dataSource={this.state.allergyDataSource} renderRow={this._allergyRenderRow} />
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
    itemView:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#d2d8e2',
        marginHorizontal:15,
        marginTop:20,
        borderRadius:6,
    },
    row1View:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:15,
        paddingLeft:10,
    },
    row2View:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:15,
        paddingLeft:10,
    },
    row1col1Text:{
        flex:1,
        color:'#64a8ef',
    },
    row1col2Text:{
        flex:1
    },
    row1col3Text:{
        flex:1,
        color:'#c0c6d0',
    },
    row2col1Text:{
        flex:1,
        color:'#64a8ef',
    },
    row2col2Text:{
        flex:2
    },

});
export default patientDetailAllergy;
