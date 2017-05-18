/**
 * 详情页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
import HTMLView from 'react-native-htmlview';
import SearchPage from'../../../common/SearchPage';
import ViewUtils from'../../utils/ViewUtils';
import Calendar from'../../../common/Calendar'
import BaseComponent from '../../../page/BaseComponent';
export default class ActivityDetailsPage extends BaseComponent {
    constructor(props){
        super(props)
        this.state = {
            attention:'关注'
        }
    }
    render() {
        var imgUrl = 'http://webapi.nbzyz.org'+this.props.detailsData.PcLstUrl.substring(1);
        let serviceTime=this.props.detailsData.DaySTime+"-"+this.props.detailsData.DayETime;
        let value=JSON.stringify(this.props.detailsData);
        return (
            <View style={{backgroundColor:'white',flex: 1}}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},this.titleView(),require('../../../../image/magnifier.png'),()=>{this.search()})}

                <ScrollView >
                    {ViewUtils.getListViewItem(null,this.props.detailsData,imgUrl)}
                    {ViewUtils.getDetailItem('活动类型',this.props.detailsData.ActivityTypeName)}
                    {ViewUtils.getDetailItem('活动报名时间',this.props.detailsData.StartTime)}
                    {ViewUtils.getDetailItem('活动报名时间',this.props.detailsData.FinishTime)}
                    {ViewUtils.getDetailItem('服务时间',serviceTime)}
                    {ViewUtils.getDetailItem('活动报名时间服务地址',this.props.detailsData.Addr)}
                    {ViewUtils.getDetailItem('活动报名时间发起单位',this.props.detailsData.StartTime)}
                    {ViewUtils.getDetailItem('联系方式',this.props.detailsData.Mobile)}
                    {ViewUtils.getDetailItem('服务专业技能',this.props.detailsData.StartTime)}


                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>
                    <Text style={{color:'#ff5114',fontSize:16,padding:10,
                                borderWidth:0.4,borderColor:'#B9BBBF'}}>活动要求</Text>
                    <HTMLView
                        value={this.props.detailsData.JobText}
                        stylesheet={{padding:10,borderWidth:0.4,borderColor:'#B9BBBF'}}
                    >
                    </HTMLView>
                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>
                    <Text style={{color:'#ff5114',fontSize:16,padding:10,
                                borderWidth:0.4,borderColor:'#B9BBBF'}}>活动详情</Text>
                    <HTMLView
                        value={value}
                        stylesheet={{padding:10,borderWidth:0.4,borderColor:'#B9BBBF'}}
                    >
                    </HTMLView>
                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>

                    <View>
                        <View style={{flexDirection:"row", borderWidth:0.4,borderColor:'#B9BBBF'}}>
                            <Text style={{color:'#ff5114',fontSize:16,padding:10,
                                width:ScreenWidth*0.85}}>已报名志愿者</Text>
                            <Text style={{color:'#ff5114',paddingTop:10}}>0</Text>
                            <Text style={{paddingTop:10,paddingRight:10}}>/10</Text>
                        </View>
                        <View style={{height:80}}>
                            <Image source={require('../../../../image/personal_no_portrait.png')}
                                   style={{width:50,height:50,margin:10}}/>
                        </View>
                    </View>

                </ScrollView>

                {ViewUtils.getDetailBottom(()=>{this.share()},()=>{this.signUp()},()=>{this.attention()},this.state.attention)}

            </View>

        );
    }
    titleView(){
        if (this.props.detailsData.Type==0){
            return "活动"

        }else {
            return "岗位"
        }

    }

    /***
     * 判断图片是中国年的文字是岗位还是活动
     * @param type
     * @returns {*}
     */
    listType(type) {
        if (type===0){
            return "活动"
        }else {
            return "岗位"
        }
    }
    /****
     * 返回到上一个页面
     */
    back(){
        this.props.navigator.pop();
    }

    /***
     * 跳转到搜索界面
     */
    search(){
        this.props.navigator.push({
            component:SearchPage

        })
    }

    /***
     * 分享
     */
    share(){

    }

    /***
     * 报名
     */
    signUp(){

    }

    /***
     * 关注
     */
    attention(){

    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent:'space-between',
        height:Platform.OS=='ios'?64:60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection:'row'
    },

    rightToolBar:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:Platform.OS=='ios'?20:10
    },
    titleStyle:{
        color:'white',
        fontSize:18,
        marginTop:Platform.OS=='ios'?20:10
    },
        bottomStyle:{
            flexDirection:'row',
            height:160,
            justifyContent:'space-between',
            alignItems:'flex-end',
            width:ScreenWidth
        },

        leftStyle:{
            backgroundColor: '#00b3b3',
            textAlign:'center',
            color:'white',
            marginLeft:4,
            padding:20,

        },
        rightStyle:{
            height:ScreenWidth*0.2,
            width:ScreenWidth*0.78,
            alignItems:'flex-end',
            justifyContent:'flex-end'

        },
        textTopStyle:{
            height:20,
            width:ScreenWidth*0.9,
            textAlign:'center',
            fontSize:16,
            color:'white',
            backgroundColor:'rgba(0,0,0,0)'

        },
        rightBottomStyle:{
            height:ScreenWidth*0.1,
            width:ScreenWidth*0.78,
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'flex-end',
        },
        textBottomStyle:{
            backgroundColor: '#00b3b3',
            color:'white',
            padding:6,
            fontSize:12,
        },
        numberBottomStyle:{
            backgroundColor: '#050416',
            color:'white',
            height:20,
            width:20,
            paddingTop:4,
            fontSize:8,
            marginTop:3,
            marginRight:3,
            textAlign:'center',


        },
    container1: {
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'

    },
    detailItemStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#B3A0A7'

    },
    detailLeftTextStyle:{
        color:'#00b3b3',
        textAlign:'center',
        fontSize:18,
        padding:16,

    },

    detailRightTextStyle:{
        color:'#B3A0A7',
        marginRight:50

    },
    //详情页面下的3个按钮
    bottomTextStyles:{
        fontSize:18,
        textAlign:'center',
        width:ScreenWidth/3,
        height:50,
        color:'black',
        borderWidth:0.3,
        paddingTop:14
    }

});
