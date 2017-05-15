/**
 * Created by Administrator on 2017/3/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    ScrollView,
    Navigator
} from 'react-native';

const Dimensions = require('Dimensions');
const ScreenWidth = Dimensions.get('window').width;
/**----外部组件的导入----**/
var Login = require('./../Login/Login');
import  MyViewUtils from './utils/MyViewUtils';
import {MineTags}from'./utils/MineTags'
import ViewUtils from'../utils/ViewUtils'
import CommonProblem from'./secondpage/CommonProblem'
import  ApplyProfessionalVolunteers from './secondpage/ApplyProfessionalVolunteers'
import  MyActivityJob from './secondpage/MyActivityJob'
import  MyAttention from './secondpage/MyAttention'
import  MyRegistrationRecord from './secondpage/MyRegistrationRecord'
import  MyRanking from './secondpage/MyRanking'
import  PersonalData from './secondpage/PersonalData'
import  AboutUs from './secondpage/AboutUs'
import  WipeCache from './secondpage/WipeCache'
import  ProblemFeedback from './secondpage/ProblemFeedback'


export default class Mine extends Component{
    render() {
        return (
            <View style={styles.container}>
                {/**导航条**/}
                {ViewUtils.getMainToolBar(()=>{this.scan()},require('../../../image/magnifier.png'),()=>{this.search()})}
                <ScrollView>

                        {/**我的顶部信息**/}
                        <Image source={require('./../../../image/personal_top_bg.png')} style={styles.headImageBgStyle}>
                            <Image source={require('./../../../image/personal_no_portrait.png')} style={styles.headImageStyle}/>
                            <Text style={styles.headTextStyle} >昵称</Text>
                            <Text style={{backgroundColor:'rgba(0, 0, 0, 0)'}}>积分：</Text>
                        </Image>
                        {/**我的中部积分信息**/}
                        <View style={styles.MiddleViewStyle}>
                            {MyViewUtils.getMiddleView('0.0','总时长')}
                            {MyViewUtils.getMiddleView('0.0','在校服务时长')}
                            {MyViewUtils.getMiddleView('0.0','在职服务时长')}
                            {MyViewUtils.getMiddleView('0.0','退休服务时长')}

                        </View>


                    <View style={{marginTop:20}}>
                        {/**在组件的 getDefaultProps()定义的参数，在引用这个组件的时候就可以直接使用**/}
                        {MyViewUtils.getMineItem('申请专业志愿者',()=>{this.OnClick(MineTags.Apply_Professional_Volunteers)})}
                        {MyViewUtils.getMineItem('我的活动/岗位',()=>{this.OnClick(MineTags.My_Activity_Job)})}
                        {MyViewUtils.getMineItem('我的关注',()=>{this.OnClick(MineTags.My_attention)})}
                        {MyViewUtils.getMineItem('我的报名记录',()=>{this.OnClick(MineTags.My_registration_record)})}
                        {MyViewUtils.getMineItem('我的排名',()=>{this.OnClick(MineTags.My_Ranking)})}
                        {MyViewUtils.getMineItem('个人资料',()=>{this.OnClick(MineTags.Personal_Data)})}


                    </View>
                    <View style={{marginTop:20}}>
                        {MyViewUtils.getMineItem('关于我们',()=>{this.OnClick(MineTags.About_Us)})}
                        {MyViewUtils.getMineItem('清空缓存',()=>{this.OnClick(MineTags.Wipe_Cache)})}
                        {MyViewUtils.getMineItem('问题反馈',()=>{this.OnClick(MineTags.Problem_Feedback)})}
                        {MyViewUtils.getMineItem('常见问题',()=>{this.OnClick(MineTags.Common_Problem)})}

                    </View>
                    <View style={{margin:20}}>
                        <TouchableOpacity onPress={() => {this.GoToNewPage()}}>
                            <Text style={styles.ButtonStyle}>退出登录</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }


    //设置跳转界面
    GoToNewPage(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Login',
                component: Login,
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    id: 2
                }
            });
        }
    }

    /****
     * 跳转到相应到页面
     * @param tags
     * @constructor
     */
    OnClick(tags){
        let TargetComponent ={...this.props};
        switch (tags){
            case MineTags.Apply_Professional_Volunteers:
                TargetComponent=ApplyProfessionalVolunteers;
                break;
            case MineTags.My_Activity_Job:
                TargetComponent=MyActivityJob;
                break;
            case MineTags.My_attention:
                TargetComponent=MyAttention;
                break;
            case MineTags.My_registration_record:
                TargetComponent=MyRegistrationRecord;
                break;
            case MineTags.My_Ranking:
                TargetComponent=MyRanking;
                break;
            case MineTags.Personal_Data:
                TargetComponent=PersonalData;
                break;
            case MineTags.About_Us:
                TargetComponent=AboutUs;
                break;
            case MineTags.Wipe_Cache:
                TargetComponent=WipeCache;
                break;
            case MineTags.Problem_Feedback:
                TargetComponent=ProblemFeedback;
                break;
            case MineTags.Common_Problem:
                TargetComponent=CommonProblem;
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
            });
        }
    }


}

const styles = StyleSheet.create({
    container: {
        //设置整个界面的背景
        flex: 1,
        backgroundColor: '#F0F0F0',
    },

    headImageBgStyle:{
        //设置顶部背景宽度属性
        width:ScreenWidth,
        height:160,
        alignItems:'center',
        justifyContent:'center'
    },
    headImageStyle:{
        //设置个人头像
        width:60,
        height:60,
        borderRadius:30,
        marginBottom:10,

    },


    MiddleViewStyle:{
        //我的界面  中间积分view
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection:'row',
        backgroundColor:'white',
    },

    MiddleImageStyle:{
        //设置圆形图片的属性 4等分
        width:90,
        height:90,
        alignItems:'center',
        justifyContent:'center',
        margin:8

    },

    headTextStyle:{
        //设置昵称字体
        fontSize:18,
        marginBottom:20,
        backgroundColor:'rgba(0, 0, 0, 0)'
    },
    navMineStyle:{
        //设置导航栏
        height:Platform.OS=='ios'?64:54,
        backgroundColor:'#00b3b3',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },
    rightStyle:{
        //图片右边对齐，使用绝对定位
        position:'absolute',
        right:10,
        top:12
    },


    navImageStyle:{
        //设置导航栏右边的图标
        width:25,
        height:25,
        flexDirection:'row'
    },

    ButtonStyle:{
        //退出登录按钮设置
        fontSize:18,
        color:'white',
        backgroundColor:'#00b3b3',
        textAlign:'center',
        padding:10,
        borderRadius:8
    }

});

// 输出组件类
module.exports = Mine;