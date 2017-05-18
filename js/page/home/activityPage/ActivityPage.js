/**
 * Created by nbcei on 2017/3/27.
 * 活动/岗位界面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
    ListView,
    RefreshControl,
    FlatView,
    Picker,
} from 'react-native';
import NetUtils from '../../utils/netUtils';

const Dimensions = require('Dimensions');
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const ACTIVITY_QUERY = "Nbcei.Plugin.NbVolunteer.Api.Impl/v1/activity/query";
const DICTIONARYTYPE_QUERY_DEFAULT = "Nbcei.Framework.Api.Impl/v1/dictionary/query/default/bycode";
const AREA_QUERY = "Nbcei.Framework.Api.Impl/v1/area/query/child";
let type_code = "";
let state_code="";
let area_code="";
let smart_code="";
let type_int=-1;

import JobDetailsPage from './JobDetailsPage';
import ActivityDetailPage from './ActivityDetailsPage';
import DropTypeModal from './modal/DropTypeModal';
import DropStateModal from './modal/DropStateModal';
import DropAreaModal from './modal/DropAreaModal';
import DropSmartModal from './modal/DropSmartModal';
import StateJson from './modal/StateJson.json';
import SmartJson from './modal/SmartJson.json';
import FreRadioButton from './FrgRadioButton';
import BaseComponent from '../../../page/BaseComponent';
export default class ActivityPage extends BaseComponent {
    constructor(props){
        super(props);
        /**第二部**/
        this.state={
            int:'',                    //判断点击的进来的是活动/岗位
            listData:[],                //活动/岗位listView的数据
            isLoading:true,             //判断是否刷新
            isDropTypeOnClick:false,    //判断是否点击了类型下拉
            isDropStateOnClick:false,   //判断是否点击了状态下拉
            isDropAreaOnClick:false,    //判断是否点击了区域下拉
            isDropSmartOnClick:false,   //判断是否点击了下拉
            dropListTypeData:[],        //下拉列表类型的数据
            dropListStateData:[],        //下拉列表区域的数据
            dropListAreaData:[],        //下拉列表区域的数据
            dropListSmartData:[],        //下拉列表区域的数据
            typeName:'类型',
            typeCode:'',
            stateName:'状态',
            stateCode:'',
            areaName:'区域',
            areaCode:'',
            smartName:'智能筛选',
            smartCode:'',
            selectInt:'',
        };
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        type_int=this.props.target;
        this.selectInt = type_int;  //这是判断用户在首页点击岗位（1）/活动（0）

    }

    componentDidMount(){
        this.onLoad();
    }

    /**
     * 类型的回调
     * @param item
     */
    type_callback(item) {
        this.setState({
            typeName: item.Name,
            typeCode: item.Code,
        });
        type_code= item.Code;
        this.selectActivityOrJob(type_int);
    }


    /**
     * 设置自定义（类型）pop弹窗
     * @returns {XML}
     */
    renderTypeView(){
        return (<DropTypeModal
            visible={this.state.isDropTypeOnClick}
            {...this.props}
            dropListTypeData={this.state.dropListTypeData}
            callback={this.type_callback.bind(this)}
            onClose={()=>this.setState({isDropTypeOnClick:false})}
        />)
    }

    /**
     * 状态的回调
     * @param item
     */
    state_callback(item) {
        this.setState({
            stateName: item.Name,
            stateCode: item.Code,
        });
        state_code= item.Code;
        this.selectActivityOrJob(type_int);
    }


    /**
     * 设置自定义（状态）pop弹窗
     * @returns {XML}
     */
    renderStateView(){
        return (<DropStateModal
            visible={this.state.isDropStateOnClick}
            {...this.props}
            dropListStateData={this.state.dropListStateData}
            callback={this.state_callback.bind(this)}
            onClose={()=>this.setState({isDropStateOnClick:false})}
        />)
    }

    /**
     * 区域的回调
     * @param item
     */
    area_callback(item) {
        this.setState({
            areaName: item.Name,
            areaCode: item.Code
        });
        area_code= item.Code;
        this.selectActivityOrJob(type_int);
    }

    /**
     * 设置自定义（区域）pop弹窗
     * @returns {XML}
     */
    renderAreaView(){
        return (<DropAreaModal
            visible={this.state.isDropAreaOnClick}
            {...this.props}
            dropListAreaData={this.state.dropListAreaData}
            callback={this.area_callback.bind(this)}
            onClose={()=>this.setState({isDropAreaOnClick:false})}
        />)
    }

    /**
     * 智能筛选的回调
     * @param item
     */
    Smart_callback(item) {
        this.setState({
            smartName: item.Name,
            smartCode: item.Code,
        });
        smart_code= item.Code;
        this.selectActivityOrJob(type_int);
    }


    /**
     * 设置自定义（智能筛选）pop弹窗
     * @returns {XML}
     */
    renderSmartView(){
        return (<DropSmartModal
            visible={this.state.isDropSmartOnClick}
            {...this.props}
            dropListSmartData={this.state.dropListSmartData}
            callback={this.Smart_callback.bind(this)}
            onClose={()=>this.setState({isDropSmartOnClick:false})}
        />)
    }

    /**
     * 点击了下拉列表
     * @param int
     * @constructor
     */
    IsDropOnClick(int){
        switch (int){
            case 1:
                this.setState({
                    isDropTypeOnClick:true,
                });
                this.getTypeData();
                break;
            case 2:
                this.setState({
                    dropListStateData:StateJson.Data,
                    isDropStateOnClick:true,
                });
                break;
            case 3:
                this.setState({
                    isDropAreaOnClick:true,
                });
                this.getAreaData();
                break;
            case 4:
                this.setState({
                    dropListSmartData:SmartJson.Data,
                    isDropSmartOnClick:true,
                });
                break;
        }
    };

    /**
     * 顶部2个滑动按钮的回调
     * @param int
     * @constructor
     */
    R_Btn_callback(int){
        type_int = int;
        this.selectInt = int; //点击按钮后回调返回的数据，进行赋值，并渲染this.selectInt
        this.selectActivityOrJob(type_int);
    }

    /**
     * 渲染数据
     * @returns {XML}
     *
     *   <TouchableOpacity onPress={()=>{this.selectJob()}}>
     <Text style={styles.switchTextStyle}>岗位</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{this.selectActivity()}}>
     <Text style={styles.switchTextStyle}>活动</Text>
     */
    render() {
        return (
            <View style={{backgroundColor:'white',width:ScreenWidth,height:ScreenHeight}}>
                {/**标题**/}
                <View style={styles.toolbar}>
                    <TouchableOpacity style={styles.rightToolBar} onPress={()=>{this.back()}}>
                        <Image source={require('../../../../image/back.png')} style={{height:20,width:20}}/>
                    </TouchableOpacity>
                    <View style={styles.switchStyle}>
                        <FreRadioButton
                            {...this.props}
                            selectInt={this.selectInt}
                            callback={this.R_Btn_callback.bind(this)}
                        />
                    </View>
                    <TouchableOpacity style={styles.rightToolBar} onPress={()=>{this.back()}}>
                        <Image source={require('../../../../image/magnifier.png')} style={{height:20,width:20}}/>
                    </TouchableOpacity>
                </View>

                {/**状态**/}
                <View style={styles.selectedStyle}>
                    <TouchableOpacity style={styles.selectTextStyle} onPress={()=>{this.IsDropOnClick(1)}}>
                        <Text style={{textAlign:'center',marginTop:6}}>{this.state.typeName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectTextStyle} onPress={()=>{this.IsDropOnClick(2)}}>
                        <Text style={{textAlign:'center',marginTop:6}}>{this.state.stateName}</Text>

                    </TouchableOpacity >
                    <TouchableOpacity style={styles.selectTextStyle} onPress={()=>{this.IsDropOnClick(3)}}>
                        <Text style={{textAlign:'center',marginTop:6}}>{this.state.areaName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectTextStyle} onPress={()=>{this.IsDropOnClick(4)}}>
                        <Text style={{textAlign:'center',marginTop:6}}>{this.state.smartName}</Text>
                    </TouchableOpacity>
                </View>

                <ListView
                    dataSource={this.dataSource.cloneWithRows(this.state.listData)}
                    enableEmptySections={true}
                    renderRow={(data)=>this.renderRow(data)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    refreshControl={<RefreshControl
                                 refreshing={this.state.isLoading}
                                 onRefresh={()=>this.onLoad()}
                    />}
                />

                {this.renderTypeView()}
                {this.renderStateView()}
                {this.renderAreaView()}
                {this.renderSmartView()}
            </View>
        );
    }

    /****
     * 返回到上一个页面
     */
    back(){
        this.props.navigator.pop();
        type_code = "";
        state_code="";
        area_code="";
        smart_code="";
    }


    /***
     * 获取类型下拉列表的数据
     */
    getTypeData(){
        NetUtils.postFromTaken(null).then(TokenData=>{
            if(TokenData){
                let token = TokenData.access_token;
                let params = {"typeCode":"ActivityType","parentId":"00000000-0000-0000-0000-000000000000"};
                NetUtils.getJson(DICTIONARYTYPE_QUERY_DEFAULT,params,token).then(resultData=>{
                    if (resultData.Data){
                        // console.log("获取类型的数据："+JSON.stringify(resultData.Data));
                        this.setState({
                            dropListTypeData:resultData.Data
                        })
                    }
                }).catch(e=>{
                    console.log(e);
                })
            }
        }).catch(e=>{
            console.log(e);
        })
    }

    /***
     * 获取地区下拉列表的数据
     */
    getAreaData(){
        NetUtils.postFromTaken(null).then(TokenData=>{
            if(TokenData){
                let token = TokenData.access_token;
                let params = {"parentId ":"ac689592-5a3e-4015-8609-cdeed42df6ab"};
                NetUtils.getJson(AREA_QUERY,params,token).then(resultData=>{
                    if (resultData.Data){
                        console.log("获取地区的数据："+JSON.stringify(resultData));
                        this.setState({
                            dropListAreaData:resultData.Data
                        })
                    }
                }).catch(e=>{
                    console.log(e);
                })
            }
        }).catch(e=>{
            console.log(e);
        })
    }


    /**选择活动**/
    selectActivityOrJob(type){

        console.log("type_code:  "+type_code);
        console.log("state_code:  "+state_code);
        console.log("area_code:  "+area_code);
        /**获取活动数据**/
        let sorts_map={'StickTime':'desc','Stick':'desc','StartTime':'desc'};
        let params = {'LanguageType':"",'Type':type,'Deleted':false,'State':1,'Sorts':sorts_map,
                        'ActivityType':type_code,'ActivityState':state_code, 'AreaCode':area_code};

        //console.log("selectActivityOrJob："+JSON.stringify(params));
        NetUtils.postFromTaken(null).then(TokenData=>{
            if (TokenData){
                let Token = TokenData.access_token;
                NetUtils.postJson(ACTIVITY_QUERY,params,Token).then(resultData=>{
                    //console.log(resultData);
                    this.setState({
                        listData:resultData.Data.Rows,
                        isLoading:false,
                    });
                })
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    /**ListView的item的布局**/
    renderRow(data){
        /**等于target=0显示活动活动否则显示岗位***/
        let imgUrl = 'http://115.238.150.174:5019'+data.PcLstUrl.substring(1);
        //console.log("类型："+data.Type);
            return  (
                <View>
                    <TouchableOpacity onPress={()=>{this.jumpToDetailPage(data,data.Type)}}>
                        <Image style={styles.bottomStyle} source={{uri:imgUrl}}>
                            <Text style={styles.leftStyle}>{this.listType(data.Type)}</Text>
                            <View style={styles.rightStyle}>
                                <Text style={styles.textTopStyle}>{data.ActivityTypeName}</Text>
                                <View style={styles.rightBottomStyle}>
                                    <View style={{flexDirection:'row',backgroundColor:'#00b3b3'}}>
                                        <Text style={styles.textBottomStyle}>活动招募人数</Text>
                                        <Text style={styles.numberBottomStyle}>{data.Recruited}/{data.RecruitNumber}</Text>
                                    </View>

                                    <View  style={{flexDirection:'row',backgroundColor:'#00b3b3'}}>
                                        <Text style={styles.textBottomStyle}>活动服务时长</Text>
                                        <Text style={styles.numberBottomStyle}>{data.LengthTime}时</Text>
                                    </View>

                                    <Text style={styles.textBottomStyle}>{data.OperationState}</Text>
                                </View>
                            </View>
                        </Image>
                    </TouchableOpacity>
                </View>
            );
    }

    listType(type) {
        if (type===0){
            return "活动"
        }else {
            return "岗位"
        }

    }

    /**设置每个条目之间的分割线**/
     renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }




    /**下拉刷新**/
    onLoad(){
        /**如果是活动点击进来，请求活动的数据，如果这岗位进来请求岗位的数据**/
        if(this.props.target===0){
            this.selectActivityOrJob(0)
        }else {
            this.selectActivityOrJob(1)
        }
    }

    /****
     * 跳转到活动/岗位的详情页
     * 活动：0
     * 岗位：1
     */
    jumpToDetailPage(data,type){
        console.log("选择的类型type："+type);
       if (type === 0){
           this.props.navigator.push({
               component:ActivityDetailPage,
               params:{
                   detailsData:data
               }
           })
       }else {
           this.props.navigator.push({
               component:JobDetailsPage,
               params:{
                   detailsData:data
               }
           })
       }
    }

}

const styles = StyleSheet.create({
    toolbar: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent:'space-around',
        height:Platform.OS=='ios'?64:60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection:'row'
    },

    rightToolBar:{
        marginTop:20
    },
    switchStyle:{
       marginBottom:10
    },
    selectedStyle:{
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent:'space-around',
        height:30,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection:'row'
    },

    selectTextStyle:{
        borderWidth:1,
        borderColor:'#B3A0A7',
        flex:1,
        height:30
    },
    bottomStyle:{
        flexDirection:'row',
        height:160,
        justifyContent:'space-between',
        alignItems:'flex-end',
        width:ScreenWidth,
        marginTop:4
    },

    leftStyle:{
        backgroundColor: '#00b3b3',
        textAlign:'center',
        color:'white',
        padding:15,
        fontSize:20

    },
    rightStyle:{
        width:ScreenWidth*0.81,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    textTopStyle:{
        height:20,
        width:ScreenWidth*0.9,
        textAlign:'center',
        fontSize:16,
        color:'white',
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
        fontSize:10,
    },
    numberBottomStyle:{
        backgroundColor: '#050416',
        color:'white',
        height:20,
        width:30,
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
    middleViewStyle: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height:100,
        borderWidth:0.5,
        borderColor:'#B3A0A7'

    },
    switchTextStyle:{
        padding:6,
        borderWidth:1,
        borderColor:'#B3A0A7',
        fontSize:16
    }
});

