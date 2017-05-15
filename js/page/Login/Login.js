/**
 * Created by Administrator on 2017/3/27.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Navigator
} from 'react-native';
import AlertModal from './AlertModal'
import NetUtils from '../utils/netUtils';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var MD5 = require("crypto-js/md5");

//Api定义变量
const USERID_LOGIN = "Nbcei.Framework.Api.Impl/v1/user/query";
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            IsRegister:false,
            username:null,
            password:null
        };
    }
    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    //设置自定义pop弹窗
    renderCustomThemeView(){
        return (<AlertModal
            visible={this.state.IsRegister}
            {...this.props}
            onClose={()=>this.setState({IsRegister:false})}
        />)
    }

    IsRegister = ()=>{
        this.setState({
            IsRegister:true,
        });
    };

    render(){
        return (
            <View style={styles.container}>
                <Image source={require('./../../../image/login_head.png')} style={{width:width,height:180}}/>
                <View style={styles.InputTextStyle}>
                    <Image source={require('./../../../image/user_name.png')} style={{width:25,height:35,marginLeft:16,marginTop:10,marginRight:5}}/>
                    <TextInput style={{width:300,height:40,marginTop:10,marginLeft:12,
                               backgroundColor: '#fff' }}
                               underlineColorAndroid='transparent'
                               multiline={true}
                               placeholder= "用户名/手机号/身份证"
                               onChangeText={(text)=>this.setState({username:text})}
                    >
                    </TextInput>
                </View>

                <View style={styles.EditTextViewStyle}>
                    <Image source={require('./../../../image/password.png')} style={{width:28,height:32,marginTop:13,marginLeft:14,marginRight:14}}/>
                    <TextInput style={{width:260,height:40,marginTop:10,
                               backgroundColor: '#fff'}}
                               password={true}
                               underlineColorAndroid='transparent'
                               multiline={true}
                               placeholder='密码'
                               onChangeText={(text)=>this.setState({password:text})}
                    />
                    <Image source={require('./../../../image/hide.png')} style={{marginTop:14,marginRight:10}}/>
                </View>

                <View>
                    <TouchableOpacity onPress={()=>{alert("点击了忘记密码")}}>
                        <Text style={{fontSize:16,marginLeft:width*0.8,marginTop:10}}>忘记密码</Text>
                    </TouchableOpacity>
                </View>

                <View style={{margin:20}}>
                    <TouchableOpacity onPress={()=>{this.LoginSuccess()}}>
                        <Text style={styles.ButtonStyle}>登 录</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.IsRegister} >
                        <Text style={styles.ButtonStyle} >注 册</Text>
                    </TouchableOpacity>
                </View>
                {this.renderCustomThemeView()}
            </View>
        );
    }

    /**
     * 登录成功
     * @constructor
     */
    LoginSuccess(){
        let username = this.state.username;
        let password = this.state.password;
        let MD5password = MD5(password);
        console.log("username:"+username);
        console.log("password: "+MD5password.toString());
        if (username === null){
            alert("用户名不能为空")
        }else if(password === null){
            alert("密码不能空")
        }else{
            let userParams = "grant_type=password"+"&"+"username="+username+"&"
                +"password="+MD5password.toString()+"&"+"usertype=1,3";
            NetUtils.postFromTaken(userParams).then(jsonData=>{
                if (jsonData!==null){
                    let token =jsonData.access_token;
                    let userId = {"userId":""+jsonData.userId};
                    NetUtils.getJson(USERID_LOGIN,userId,token).then(jsonData=>{
                        alert(JSON.stringify(jsonData));
                        if (jsonData!==null){
                           this._pressButton();
                        }
                    })
                }
            }).catch(error=>{
                alert(error)
            })
        }
    }


}

const styles = StyleSheet.create({

    container: {
        //设置整个界面的背景
        flex: 1,
        backgroundColor: 'white',
    },
    InputTextStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        backgroundColor:'white',
        borderColor:'gray',
        borderWidth:1
    },

    EditTextViewStyle:{
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'center',
        borderColor:'gray',
        borderWidth:1
    },

    ButtonStyle:{
        //登录按钮设置
        fontSize:18,
        color:'white',
        backgroundColor:'#00b3b3',
        textAlign:'center',
        padding:10,
        borderRadius:8,
        marginTop:10
    }
});
// 输出组件类
module.exports = Login;