/**
 *
 * Created by nbcei on 2017/3/27.
 * 注册成志愿者
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
    TextInput,
    ScrollView
} from 'react-native';
import Login from './../Login/Login'
import CardTypePage from './commonPage/CardTypePage';
import AttributePage from './commonPage/AttributePage';
import AreaSelectPage from './commonPage/AreaSelectPage';
import OrgSelectPage from './commonPage/OrgSelectPage';
import NetUtils from './../utils/netUtils';
import CheckBoxTest from './commonPage/CheckBoxTest';
import RadioButtonTest from './commonPage/RadioButtonTest';
import RadioModalTest from './commonPage/RadioModalTest';
import CheacListViewTest from './commonPage/CheacListViewTest';
import BaseComponent from '../../page/BaseComponent';
//发送短信API
const SEND_PHONE = "Nbcei.Plugin.NbVolunteer.Api.Impl/v1/smsauth/send/register";
//验证短信API
const GET_VERYFY = "Nbcei.Plugin.NbVolunteer.Api.Impl/v1/smsauth/valid/register";
//注册志愿者API
const VOLUNTEER_CREATE = "Nbcei.Plugin.NbVolunteer.Api.Impl/v1/volunteer/create";

export default class Registermajorvolunteer extends BaseComponent {
    constructor(props){
        super(props);

        this.state={
            nickName:null, //昵称
            trueName:null, //真实姓名
            cardType:"==请选择==", //证件类型
            cardCode:null,  //证件类型的code
            Email:null, //邮箱
            IdNumber:null,  //身份证号码
            passWord:null,  //密码
            RepassWord:null,    //确认密码
            phone:null, //手机号
            personalName:null, //个人属性的名字
            personalCode:null, //个人属性code
            areaName:null,  //地区名
            orgName:null,   //机构名
            areaCode:null,  //地区Code
            orgId:null,     //机构Id
            verification_code:null, //验证码

            AttributeTypeName:[], //个人属性Name数组
            AttributeTypeCode:[], //个人属性Code数组
        }
    }


    //渲染组件
    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.rightToolBar} onPress={()=>{this.back()}}>
                            <Image source={require('../../../image/back.png')} style={{height:20,width:20,marginLeft:30}}/>
                        </TouchableOpacity>
                        <Text style={styles.titleStyle}>注册专业志愿者</Text>
                        <Image source={require('../../../image/magnifier.png')} style={{height:20,width:20,marginTop:Platform.OS=='ios'?20:8,marginRight:30}}/>
                    </View>
                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>昵 称:</Text>
                        <TextInput style={[styles.detailInputTextStyle,{marginLeft: 38}]}
                                   placeholder='请输入昵称'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({nickName:text})}
                        />
                    </View>
                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>姓 名:</Text>
                        <TextInput style={[styles.detailInputTextStyle,{marginLeft: 38}]}
                                   placeholder='请输入姓名'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({trueName:text})}
                        />
                    </View>
                    <View >
                        <TouchableOpacity  style={styles.detailItemStyle}
                                           onPress={()=>{this.props.navigator.push({
                                            component:CardTypePage
                                        })}}>
                            <Text style={styles.detailLeftTextStyle}>证件类型:</Text>
                            <Text style={styles.detailInputTextStyle}>{this.state.cardType}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>证件号码:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='请输入证件号码'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({IdNumber:text})}
                        />
                    </View>

                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>电子邮箱:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='请输入电子邮箱'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({Email:text})}
                        />
                    </View>
                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>登录密码:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='请输入登录密码'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({passWord:text})}
                        />
                    </View>
                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>确认密码:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='请再次确认密码'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({RepassWord:text})}
                        />
                    </View>

                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                            borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                component:AttributePage,
                                                params:{
                                                    onCallBack:(personalName,personalCode)=>{
                                                        this.setState({
                                                            AttributeTypeName:personalName,
                                                            AttributeTypeCode:personalCode
                                                        })
                                                    }
                                                }
                                            })}}>
                        <Text style={styles.detailLeftTextStyle}>个人属性</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                           borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                    component:AreaSelectPage
                                                })}}>
                        <Text style={styles.detailLeftTextStyle}>所在区域</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                            borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                    component:OrgSelectPage
                                                })}}>
                        <Text style={styles.detailLeftTextStyle}>所属机构</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                            borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                    component:CheckBoxTest
                                                })}}>
                        <Text style={styles.detailLeftTextStyle}>政治面貌</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                            borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                    component:RadioButtonTest
                                                })}}>
                        <Text style={styles.detailLeftTextStyle}>意向时间</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                            borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                    component:RadioModalTest
                                                })}}>
                        <Text style={styles.detailLeftTextStyle}>意向类别</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection:'row' ,justifyContent:'space-between',
                                            borderBottomWidth:1,  borderColor:'#B3A0A7' }}
                                       onPress={()=>{this.props.navigator.push({
                                                    component:CheacListViewTest
                                                })}}>
                        <Text style={styles.detailLeftTextStyle}>专业能力</Text>
                        <Image style={{height:24,width:24,marginTop:10}} source={require('./../../../image/rightback.png')}/>
                    </TouchableOpacity>
                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>现工作单位:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='在此输入您的工作单位'
                                   underlineColorAndroid='transparent'
                                   multiline={true}

                        />
                    </View>

                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>现家庭地址:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='在此输入你的家庭地址'
                                   underlineColorAndroid='transparent'
                                   multiline={true}

                        />
                    </View>
                    <View style={{flexDirection:'row' ,justifyContent:'space-between',  borderBottomWidth:1,  borderColor:'#B3A0A7' }}>
                        <Text style={styles.detailLeftTextStyle}>手机号码:</Text>
                        <TextInput style={{ height:Platform.OS=="ios"?30:40,width:Platform.OS=="ios"?170:210,alignItems:'center',marginTop:5,fontSize:14,color:'#B3A0A7'}}
                                   placeholder='请输入手机号码'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({RepassWord:text})}
                        />
                        <TouchableOpacity style={{alignItems:'center',margin:2}} onPress={()=>{this.sendCode()}}>
                            <Text style={{padding:8,borderColor:'#00b3b3',borderRadius:4,borderWidth:2}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>验证码:</Text>
                        <TextInput style={[styles.detailInputTextStyle,{marginLeft: 32}]}
                                   placeholder='请输入验证码'
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   onChangeText={(text)=>this.setState({RepassWord:text})}
                        />
                    </View>
                    <View style={{  flexDirection: 'row', justifyContent: 'center', alignItems:'center',marginTop:16}}>
                        <Text style={{color: '#00b3b3'}}>注册表示您同意</Text>
                        <Text >《宁波市注册志愿者管理办法》</Text>
                    </View>

                    <View style={styles.ButtonViewStyle}>
                        <TouchableOpacity onPress={()=>{this.informationJudge()}}>
                            <Text style={styles.ButtonTextStyle}>注　册</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ButtonViewStyle}>

                        <TouchableOpacity onPress={()=>{this.props.navigator.push({
                            component:Login
                        })}}>
                            <Text style={styles.ButtonTextStyle}>已有账号　点击登录</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{this.state.AttributeTypeName}</Text>
                    <Text>{this.state.AttributeTypeCode}</Text>
                </ScrollView>
            </View>

        );
    }

    /**
     * 发送短信验证码
     */
    sendCode(){
        let phone = this.state.phone; //手机号
        NetUtils.postFromTaken(null).then(jsonData=>{
            if (jsonData !== null){
                let token =jsonData.access_token;
                NetUtils.getJson(SEND_PHONE,phone,token).then(jsonData=>{
                    if(jsonData.Success){
                        alert("验证码已发送")
                    }else {
                        alert("验证码发送失败"+jsonData.message)
                    }
                })
            }
        }).catch(error=>{
            alert(error)
        })
    }


    /**
     * 注册逻辑处理
     */
    informationJudge(){
        let nickName = this.state.nickName; //昵称
        let trueName = this.state.trueName; //真实姓名
        let cardType = this.state.cardType; //证件类型
        let cardCode =this.state.cardCode;  //证件类型的code
        let Email = this.state.Email; //邮箱
        let IdNumber = this.state.IdNumber; //身份证号码
        let passWord = this.state.passWord;  //密码
        let RepassWord = this.state.RepassWord;    //确认密码
        let phone = this.state.phone; //手机号
        let personalCode = this.state.personalCode; //个人属性code
        let areaName = this.state.areaName;  //地区名
        let orgName = this.state.orgName;   //机构名
        let areaCode = this.state.areaCode; //地区Code
        let orgId = this.state.orgId;       //机构Id
        let verification_code = this.state.verification_code; //验证码

        if (nickName === null){
            alert("昵称不能为空")
        }else if (trueName === null){
            alert("姓名不能为空")
        }else if (cardCode === null){
            alert("证件类型不能为空")
        }else if (Email === null){
            alert("邮箱不能为空")
        }else if (IdNumber === null){
            alert("身份证号不能为空")
        }else if (passWord === null || passWord.length < 6){
            alert("密码需要不小于六位")
        }else if (RepassWord === null ){
            alert("确认密码不能为空")
        }else if (RepassWord !== passWord){
            alert("两次密码不同，请重新确认")
        }else if (personalCode === null){
            alert("请选择个人属性")
        }else if (areaName === null){
            alert("请选择所在区域")
        }else if (orgName === null){
            alert("请选择所属机构")
        }else if (phone === null){
            alert("请输入正确的手机号")
        }else if (verification_code === null){
            alert("请输入验证码")
        }else {
            NetUtils.postFromTaken(null).then(jsonData=>{
                if(jsonData!==null){
                    let token =jsonData.access_token;
                    let phoneData = {"phone":""+phone,"SMScode":""+verification_code};
                    NetUtils.getJson(GET_VERYFY,phoneData,token).then(jsonData=>{
                        if (jsonData.Success){
                            let registerData = [{"LoginUserName":""+nickName,"TrueName":""+trueName,
                                "UserPassword":""+passWord,"ReUserPassword":""+RepassWord,
                                "IdNumber":""+IdNumber,"Mobile":""+phone,"AreaCode":""+areaCode,
                                "OrgIds":""+orgId,"Email":""+Email,"JobStatus":""+personalCode,
                                "IsSpeciality":false,"AuditStatus":0}];
                            NetUtils.postJson(VOLUNTEER_CREATE,registerData,token).then(jsonData=>{
                                if (jsonData.Data !== null){
                                    alert("注册成功");
                                }else {
                                    alert("注册失败 "+ jsonData.message);
                                }
                            })
                        }else {
                            alert("验证码错误");
                        }
                    })
                }
            })
        }
    }

    //返回按钮
    back(){
        this.props.navigator.pop();
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
    detailItemStyle:{
        flexDirection: 'row',

        borderBottomWidth:1,
        borderColor:'#B3A0A7'
    },
    detailLeftTextStyle:{
        color:'black',
        textAlign:'center',
        fontSize:16,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,

    },

    detailInputTextStyle:{
        height:Platform.OS=="ios"?30:40,
        width:280,
        alignItems:'center',
        marginTop:Platform.OS=='ios'?7:6,
        fontSize:14,
        color:'#B3A0A7',
        marginLeft:10,
        paddingTop:Platform.OS=='ios'?0:5,
    },

    ButtonViewStyle:{
        //设置注册按钮外边框
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        marginBottom:5
    },

    ButtonTextStyle:{
        //注册按钮设置
        fontSize:16,
        color:'white',
        backgroundColor:'#00b3b3',
        textAlign:'center',
        padding:10,
        borderRadius:8,
        marginTop:10
    }


});

