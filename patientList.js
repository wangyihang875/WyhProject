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
  Alert, Image,TouchableOpacity, ListView,ActivityIndicator,RefreshControl
} from 'react-native';
import {toastShort} from './utils/ToastUtil';
import PatientDetail from './patientDetail';
class PatientList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: true,
            isShowBottomRefresh: false,
            refreshing: false,
            isEnd: false,
            pageNum: 1,
            pageSize: 5,
            dataList: []
        };
    }

    componentWillMount() {
        this._getPatientListData();
    }

    _getPatientListData(){
        fetch('http://disedc.cxjky.com/interface/getDocPagingInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': 'FnureEYnavbeGhlUVnyfww==',
            },
            // body: "departmentno=" + this.props.departmentno + "&start=0&rows=10&patientkey="
            body: "departmentno=" + this.props.departmentno + "&start="+this.state.pageNum+"&rows="+this.state.pageSize+"&patientkey="
        }).then(
            (response) =>response.json()
        ).then((responseJson) => {
            if(responseJson.data.msg==="0000"){
                let jsonArray = responseJson.data.jsonArray;
                let len = jsonArray.length;
                if(len<this.state.pageSize){
                    this.setState({
                        isEnd:true,
                    });
                }
                for(let i=0;i<len;i++){
                    this.state.dataList.push(jsonArray[i]);
                }
                let dataList = this.state.dataList;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(dataList),
                    isLoading:false,
                    isShowBottomRefresh:false,
                    refreshing:false
                })
            }else{
                toastShort('服务器返回错误status='+responseJson.data.msg);
            }
        }).catch((error) => {
            alert("error:"+error);
        });
    }

    _onEndReached = () => {
        if (!this.state.isShowBottomRefresh) {
            this.setState({pageNum: this.state.pageNum + this.state.pageSize, isShowBottomRefresh: true});
            setTimeout(()=>{
                this._getPatientListData();
            },500);
        }
    }
    //下拉刷新
    _onRefresh = () => {
        this.setState({isEnd: false, pageNum: 1, pageSize: 5, dataList: []});
        setTimeout(()=>{
            this._getPatientListData();
        },500);
    }

    //上拉加载样式
    _renderFooter = () => {

        if (this.state.isEnd) {
            return <View style={{marginBottom: 10}}><Text style={{textAlign: 'center', fontSize: 11}}>没有更多了！</Text></View>;
        }
        else if(this.state.isShowBottomRefresh){
            return (<View style={{marginTop: -15}}>
                <ActivityIndicator />
            </View>);
        }
        return ;
    }

    _onPress(idcard){
        const {navigator} = this.props;
        navigator.push({
            name:'patientDetail',
            component:PatientDetail,
            params:{
                idcard:idcard,
            }
        });
    }


    //noinspection JSAnnotator
    _renderRow = (rowData: string,sectionID: number, rowID: number)=>{
        var imgSrc = rowData.sex==="男" ? require('./image/m.png') : require('./image/w.png');
        return (
            <View style={styles.listContains}>
                <View style={styles.firstLine}>
                    <View style={styles.firstLineBlock1}>
                        <Text style={[styles.firstLineText]}>
                            {rowData.patientname}       {rowData.age}岁
                        </Text>
                        <Image source={imgSrc}style={[styles.sexImg]}/>
                    </View>
                    <TouchableOpacity style={styles.firstLineBlock2} onPress={()=>{this._onPress(rowData.idcard)}
                    }><Text style={[styles.aDetail]}>查看详情</Text></TouchableOpacity>
                </View>
                <View style={styles.secondLine}>
                    <Text style={[styles.secondLineText1]}>
                        手机号码
                    </Text>
                    <Text style={[styles.secondLineText2]}>
                        {rowData.mobilphone}
                    </Text>
                </View>

                <View style={styles.secondLine2}>
                    <Text style={[styles.secondLineText1]}>
                        现住地址
                    </Text>
                    <Text style={[styles.secondLineText2]}>
                        {rowData.address}
                    </Text>
                </View>
                <View style={styles.thirdLine}>
                    <TouchableOpacity style={styles.optionBtn}><Text style={styles.optionText}>趋势图表</Text></TouchableOpacity><TouchableOpacity style={styles.optionBtn}><Text style={styles.optionText}>录入血压血糖</Text></TouchableOpacity>
                </View>
            </View>
        );
    }

    render(){
        return (
            <View style={styles.contains}>
                <View style={styles.titleBar}>
                    <Text style={styles.titleBarText}>患者列表</Text>
                </View>
                {
                    this.state.isLoading==true ? <View><Text style={{textAlign: 'center'}}>loading.....</Text></View> :
                        <ListView dataSource={this.state.dataSource}
                                  renderRow={this._renderRow}
                                  onEndReached={this._onEndReached}
                                  onEndReachedThreshold={1}
                                  renderFooter={this._renderFooter}
                                  refreshControl={<RefreshControl
                                     refreshing={this.state.refreshing}
                                     onRefresh={this._onRefresh }
                                     colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                                     progressBackgroundColor="#fff"
                                  />}
                        />
                }
            </View>
        );
    };
}

var styles=StyleSheet.create({
    contains:{
        flex:1,
        backgroundColor:'#ECF5FD',
    },
    titleBar:{
        // flex:0.1,
        backgroundColor:'#62a2f3',
        justifyContent:'center',
        alignItems:'center',
    },
    listContains:{
        backgroundColor:'white',
        paddingLeft:10,
        paddingRight:10,
        marginBottom:20,
    },
    titleBarText:{
        color:'#ffffff',
        fontSize:20,
        paddingVertical:10
    },

    firstLine:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:5,
        paddingRight:20,
        borderBottomWidth:1,
        borderBottomColor:'#aaa',
    },
    secondLine:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:5,
        paddingRight:20,
    },
    secondLine2:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:5,
        paddingRight:20,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#708baa',
    },
    thirdLine:{
        flex:1.2,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    firstLineText:{
        fontSize:20,
        color:'#666666',
        marginVertical:5
    },

    sexImg:{
        width:15,
        height:15,
        marginLeft:10,
    },
    firstLineBlock1:{
        flexDirection:'row',
        alignItems:'center',
    },
    firstLineBlock2:{
        flexDirection:'row',
        alignItems:'center',
    },
    aDetail:{
        fontSize:15,
        color:'#62a2f3',
    },
    secondLineText1:{
        fontSize:16,
        color:'#999999',
    },
    secondLineText2:{
        fontSize:16,
        color:'#999999',
    },
    optionBtn:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderColor:'#62a2f3',
        borderWidth:1,
        paddingHorizontal:5,
        paddingVertical:2,
        marginHorizontal:5,
    },
    optionText:{
        color:'#62a2f3',
        fontSize:15,
    },

});
export default PatientList;
