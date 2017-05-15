/**
 * Created by Administrator on 2017/3/7.
 * 安卓的启动页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator
} from 'react-native';

import MainPage from './MainPage';

// /**-----导入外部的组件-------**/
// var Main = require('./Main');
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
export default class Welcome extends Component {
    render() {
        return (
            <Image source={require('./../../image/icon_splash_bg.png')} style={styles.welcomeStyles}/>
        );
    }

    //复杂的操作；定时器、网络请求
    componentDidMount(){
        //定时：隔2s切换到Main
        this.timer=setTimeout(()=>{
            this.props.navigator.resetTo({
                component:MainPage,//具体路由的版块
            });
        },2000);
    }
    //清除计时器
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
};

const styles = StyleSheet.create({
    welcomeStyles:{
        flex:1,
        width:width
    },
});
//输出组件类
module.exports = Welcome;
