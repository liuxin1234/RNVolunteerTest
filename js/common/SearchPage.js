/**
 * Created by nbcei on 2017/4/18.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';

import NetUtils from './netutil';
import {Api}from '../page/utils/Api';
import SearchListPage from'./SearchListPage';
export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topViewStyle}>
                    <TextInput style={styles.textInputStyle}
                               placeholder='  🔍'
                               value={this.state.text}
                               onChangeText={(text) =>{this.getData(text)}}

                    />
                    <TouchableOpacity onPress={()=>{this.back()}}>

                        <Text style={{padding:10,alignItems:'center',marginTop:10,fontSize:20 }}>取消</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.itemStyle}>
                    <View style={{height:30,width:3,backgroundColor:'#00b3b3', }}/>
                    <Text style={{padding:8}}>搜索选项</Text>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20,marginLeft:20}}>
                    <TouchableOpacity onPress={()=>{this.activityOrJob(0)}}>
                        <Text style={styles.textItemStyle}>活动</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.activityOrJob(1)}}>
                        <Text style={styles.textItemStyle}>岗位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.organization()}}>
                        <Text style={styles.textItemStyle}>组织</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.itemStyle}>
                    <View style={{height:30,width:3,backgroundColor:'#00b3b3', }}/>
                    <Text style={{padding:8}}>历史记录</Text>
                </View>


                <TouchableOpacity>
                    <Text style={styles.clearStyle}>清空历史记录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    back() {
        this.props.navigator.pop();
    }

    /****
     * 得到输入输入框的内容，开始发起请求
     * @param text
     */
    getData(text) {
        this.setState({
            text: text
        })
    }

    /**活动**/
    activityOrJob(searchType) {
        let keyWord=this.state.text;
        let url='http://115.238.150.174:5019/api/Nbcei.Plugin.NbVolunteer.Api.Impl/v1/activity/query';
        switch (searchType) {
            case 0:
                let activityParams = {'Type':searchType, 'Status': 1, 'KeyWord':keyWord, 'PageSize': '20',};
                NetUtils.postFromTaken(Api.SearchPage_Activity,activityParams).then(result=>{
                    this.props.navigator.push({
                        component:SearchListPage,
                        params:{
                            detailsData:result.Data.Rows,
                            text:keyWord,
                        }

                    })
                }).done();
                break;
            case 1:
                /****
                 * 岗位
                 */
                let jobParams = {'Type':searchType, 'Status': 1, 'KeyWord':keyWord, 'PageSize': '20',};
                NetUtils.postFromTaken(Api.SearchPage_Job,jobParams).then(result=>{
                    console.log(result);
                    this.props.navigator.push({
                        component:SearchListPage,
                        params:{
                            detailsData:result.Data.Rows,
                            text:keyWord,
                        }

                    })
                }).done();
                break
        }
    }


    /**组织**/
    organization() {
        let keyWord=this.state.text;
        let url='http://115.238.150.174:5019/api/Nbcei.Plugin.NbVolunteer.Api.Impl/v1/company/query';
        let activityParams = {'Status': 1, 'KeyWord':keyWord, 'PageSize': '20',};
        NetUtils.postFromTaken(url,activityParams).then(result=>{
            console.log(result)
            this.props.navigator.push({
                component:SearchListPage,
                params:{
                    detailsData:result.Data.Rows,
                    text:keyWord,
                    tag:2
                }

            })
        }).done();
    }
}

const styles = StyleSheet.create({
    container: {
        //设置整个界面的背景
        flex: 1,
        backgroundColor: '#D9D9D9',
        justifyContent: 'flex-start'
    },
    topViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: Platform.OS == 'ios' ? 74 : 54,//如果系统是iOS高度就是64不是iOS高度就是44
        borderBottomWidth: 1
    },
    textInputStyle: {
        width: 280,
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        marginTop:Platform.OS=='ios'? 24:4
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 40
    },
    textItemStyle: {

        borderWidth: 1,
        borderRadius: 4,
        padding: 3,
        paddingLeft: 20,
        paddingRight: 20
    },
    clearStyle: {
        padding: 4,
        borderWidth: 1,
        textAlign: 'center',
        marginTop: 100,
        width: 200,
        marginLeft: 80,
        backgroundColor: '#00b3b3'
    }

});

