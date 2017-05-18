/**
 * Created by nbcei on 2017/3/29.
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
    ScrollView,
    RefreshControl,
    ListView
} from 'react-native';
import NetUtils from '../../utils/netUtils'
import OrganizationDetailsPage from './OrganizationDetailsPage';

import SearchPage from'../../../common/SearchPage';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
const COMPANY_QUERY = "Nbcei.Plugin.NbVolunteer.Api.Impl/v1/company/query";
import ViewUtils from'../../utils/ViewUtils'
import Search from'../../../common/SearchPage'
import BaseComponent from '../../../page/BaseComponent';
export default class OrganizationPage extends BaseComponent {
    constructor(props){
        super(props);
        /**第二部**/
        this.state={
            listData:[],
            isLoading:true,
        };
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
    }

    componentDidMount() {
        this.onLoad();

    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'组织',require('../../../../image/magnifier.png'),() => {
                    this.search()
                })}
                {/**状态**/}
                <View style={styles.selectedStyle}>
                    <TouchableOpacity style={styles.selectTextStyle}>
                        <Text style={{textAlign:'center',marginTop:6}}>类型</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectTextStyle}>
                        <Text style={{textAlign:'center',marginTop:6}}>类型</Text>
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
            </View>
        );
    }

    renderRow(data){
        return(

                <TouchableOpacity style={{flexDirection:'row',padding:10}} onPress={()=>{this.jumpToOrgDetail(data)}}>
                    <Image style={styles.imageItemStyles} source={require('./../../../../image/organization.png')}/>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:"#00b3b3",fontSize:16}}>{data.CompanyName}</Text>
                        <Text style={{fontSize:16}}>{data.Person}:{data.Mobile}</Text>
                        <Text style={{fontSize:16}}>{data.Addr}</Text>
                    </View>
                </TouchableOpacity>

        )
    }

    /**设置每个条目之间的分割线**/
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }


    /**下拉刷新**/
    onLoad(){
        NetUtils.postFromTaken(null).then(TokenData=>{
            if (TokenData){
                let token = TokenData.access_token;
                let params = {"PageIndex":1};
                NetUtils.postJson(COMPANY_QUERY,params,token).then(resultData=>{
                    console.log(JSON.stringify(resultData.Data.Rows));
                    this.setState({
                        listData:resultData.Data.Rows,
                        isLoading:false
                    });
                    if (resultData.Data !== null){

                    }
                }).catch(error=>{
                    alert(error.message);
                }).done()
            }
        }).catch(error=>{
            alert(error.message);
        }).done()
    }


    /**
     * 跳转到组织详情界面
     */
    jumpToOrgDetail(data) {
        this.props.navigator.push({
            component: OrganizationDetailsPage,
            params: {
                orgDateilData: data
            }
        });
    }


    /****
     * 返回到上一个页面
     */
    back(){
        this.props.navigator.pop();
    }

    search(){
        this.props.navigator.push({
            component:Search

        })
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent:'space-between',
        height:Platform.OS=='ios'?64:44,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection:'row'
    },

    rightToolBar:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:20
    },
    titleStyle:{
        //标题设置
        color:'white',
        fontSize:18,
        marginTop:20
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

    imageItemStyles:{
      //列表图片属性设置
        width:80,
        height:80,
    }


});

