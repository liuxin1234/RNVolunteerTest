/**
 * Created by nbcei on 2017/3/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

    ListView,
    TouchableOpacity,
    RefreshControl,
    Image,
    ScrollView

} from 'react-native';
import Swiper from 'react-native-swiper';
import NetUtil from '../../common/netutil';
import DetailsPage from './activityPage/ActivityDetailsPage';
import ViewUtil from '../utils/ViewUtils';
import {Tags} from '../../common/Tags';
const Dimensions = require('Dimensions');
const ScreenWidth = Dimensions.get('window').width;
import SearchPage from '../../common/SearchPage'
import RegisterVolunteer from './RegisterVolunteer';
import RegisterMajorVolunteer from './Registermajorvolunteer';
import ActivityPage from './activityPage/ActivityPage';
import Organization from './organizationPage/OrganizationPage';
import ActivityDetailsPage from'./activityPage/ActivityDetailsPage'
import JobDetailsPage from'./activityPage/JobDetailsPage'

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        /**第二部**/
        this.state={
            listData:[],
            isLoading:true,
            newData:[],
            listImages:[]
        };
    }

    /****
     * 在componentDidMount方法中进行耗时操作比如网路请求，数据库，计时器等
     */
    componentDidMount() {
        this.onLoad()
    }
    /****
     * 监听事件
     * @param tags
     */
    onClick(tags){
        switch (tags){
            case Tags.Registered_Volunteer:
                this.registerVolunteer();
                break;
            case Tags.Registered_Professional_Volunteers:
                this.registerMajorVolunteer();
                break;
            case Tags.Organization:
                this.toOrganizationPage();
                break;
            case Tags.Post:
                this.job();
                break;
            case Tags.Activity:
                this.activity();
                break;

        }

    }

    render() {
        return (
            <View >
                {ViewUtil.getMainToolBar(()=>{this.scan()},require('../../../image/magnifier.png'),()=>{this.search()})}
                <View style={{marginBottom:120}}>
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(this.state.listData)}
                        enableEmptySections={true}
                        renderRow={(data)=>this.renderRow(data)}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                        renderHeader={()=>this.renderHeader()}
                        refreshControl={<RefreshControl
                                 refreshing={this.state.isLoading}
                                 onRefresh={()=>this.onLoad()}
                    />}
                    />
                </View>

            </View>
        );
    }


    renderRow(data){
        let imgUrl = 'http://115.238.150.174:5019'+data.PcLstUrl.substring(1);
        return  (
            ViewUtil.getListViewItem(()=>{this.toDetailsPage(data)},data,imgUrl)
        )


    }
    /**设置每个条目之间的分割线**/
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }

    renderHeader(){
        return(<View>
            <Swiper
                horizontal={true}
                autoplay={true}
                height={160}
                showsButtons={false}
                autoplayTimeout={3}
            >
                <Image  source={{uri:this.state.newData[0]}} style={{height:160,width:ScreenWidth}}/>
                <Image  source={{uri:this.state.newData[1]}} style={{height:160,width:ScreenWidth}}/>
                <Image  source={{uri:this.state.newData[2]}} style={{height:160,width:ScreenWidth}}/>
            </Swiper>
            <View style={styles.middle_container}>
                {/**注册志愿者**/}
                {ViewUtil.getHomeMiddleView(()=>{this.onClick(Tags.Registered_Volunteer)},require('../../../image/regist.png'),'注册','志愿者')}
                {/**注册专业志愿者**/}
                {ViewUtil.getHomeMiddleView(()=>{this.onClick(Tags.Registered_Professional_Volunteers)},require('../../../image/professionalregist.png'),'注册','专业志愿者')}
                {/**组织***/}
                {ViewUtil.getHomeMiddleView(()=>{this.onClick(Tags.Organization)},require('../../../image/organization.png'),'组织','')}
            </View>
            <View style={styles.middle_container}>
                {/**岗位***/}
                {ViewUtil.getHomeMiddleView(()=>{this.onClick(Tags.Post)},require('../../../image/jobs.png'),'岗位','')}
                {/**活动***/}
                {ViewUtil.getHomeMiddleView(()=>{this.onClick(Tags.Activity)},require('../../../image/activity.png'),'活动','')}
                {/**积分商城***/}
                {ViewUtil.getHomeMiddleView(()=>{this.onClick(Tags.Integral_Mall)},require('../../../image/shop.png'),'积分商城','')}
            </View>
        </View>)
    }

    /**下拉刷新**/
    onLoad(){
        /**模拟网路请求，两秒  **/
        let sorts_map={'StickTime':'desc','Stick':'desc','StartTime':'desc'};
        let params = {'PageIndex':1,'Stick':1,'PageSize':6,'LanguageType':'','Sorts':sorts_map};

        /**获取listview的数据**/
        NetUtil.postFromTaken('http://115.238.150.174:5019/api/Nbcei.Plugin.NbVolunteer.Api.Impl/v1/activity/query',params).then(jsonData=>{
            let imagesArray=jsonData.Data.Rows;
            let newsImagesArray=[];
            for(let i=0;i<jsonData.Data.Rows.length;i++){
                //取出某一个单独数据
                let itemData=imagesArray[i];
                let imagesUrls= 'http://http://115.238.150.174:5019/api/'+itemData.PcLstUrl.substring(1);
                newsImagesArray.push(imagesUrls);
            }
            this.setState({
                listData:jsonData.Data.Rows,
                isLoading:false,
                listImages:newsImagesArray
            });
        }).catch(error=>{
            this.setState({
                result:JSON.stringify(error)
            })
        });

        let newsparams = {'Permission':true,'CategoryId':'434d9fae-f27d-4739-b99a-ceb21f79171a','PageSize':4};
        /**获取头部广告条的数据**/
        NetUtil.postFromTaken('http://115.238.150.174:5019/api/Nbcei.Plugin.CMS.Api.Impl/v1/Content/query',newsparams).then(jsonData=>{
            let imagesArray=jsonData.Data.Rows;
            let newsImagesArray=[];
            for(let i=0;i<jsonData.Data.Rows.length;i++){
                //取出某一个单独数据
                let itemData=imagesArray[i];
                let imagesUrls= 'http://115.238.150.174:5019'+itemData.SmallImgViewPc.substring(1);
                newsImagesArray.push(imagesUrls);
            }
            this.setState({
                newData:newsImagesArray,
                isLoading:false
            })
        }).catch(error=>{
            this.setState({
                result:JSON.stringify(error)
            });
        });

    }

    /***
     * 跳转到注册成志愿者
     */
    registerVolunteer(){
        this.props.navigator.push({
            component: RegisterVolunteer,
            params:{
                target:this.state.listData.Type
            }
        });

    }
    /***
     * 跳转到注册成专业志愿者
     */
    registerMajorVolunteer(){
        this.props.navigator.push({
            component: RegisterMajorVolunteer,
            params:{
                target:this.state.listData.Type
            }
        });

    }

    /**跳转到activity,0是活动，1是岗位**/
    activity(){
        this.props.navigator.push({
            component: ActivityPage,
            params:{
                target:0
            }
        });
    }

    /**跳转到岗位**/
    job(){
        this.props.navigator.push({
            component: ActivityPage,
            params:{
                target:1
            }
        });
    }

    /***
     * 跳转到详情页,判断是岗位还是活动
     */
    toDetailsPage(data){
        console.log(data);
        if (data.Type===0){
            this.props.navigator.push({
                component: ActivityDetailsPage,
                params:{
                    detailsData:data
                }
            });
        }else {
            this.props.navigator.push({
                component: JobDetailsPage,
                params:{
                    detailsData:data
                }
            });
        }

    }

    /*****
     * 跳转到组织界面
     */

    toOrganizationPage(){
        this.props.navigator.push({
            component:Organization,
        })
    }

    /****
     * 扫一扫二维码
     */
    scan(){
        alert("ddd")
    }

    /***
     * 跳转到收缩页面
     */
    search(){
        this.props.navigator.push({
            component:SearchPage,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    middle_container: {
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'

    },



});

// 输出组件类
module.exports = HomePage;