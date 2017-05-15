/**
 * Created by nbcei on 2017/4/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    TextInput
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
export default class MyViewUtils {
    static getMiddleView(topTime,bottomTime){
        return(
            <Image source={require('../../../../image/personal_middle_circle.png')} style={styles.MiddleImageStyle}>
                <Text>{topTime}小时</Text>
                <Text style={{fontSize:12,color:'#F40755'}}>{bottomTime}</Text>
            </Image>
        )
    }

    /****
     * mine页面的item布局
     * @param leftText  左边显示的文字
     * @param callBack  点击事件
     * @returns {XML}
     */
    static getMineItem(leftText,callBack){
        return (
            <TouchableOpacity onPress={callBack} style={styles.MineItemStyle}>
                {/**左边**/}
                <Text>{leftText}</Text>
                {/**右边**/}
                 <Image style={{width:8,height:13}} source={require('../../../../image/rightback.png')}/>
            </TouchableOpacity>
        )
    }
    static getPersonItemNoMore(leftText,rightText,callback){
        return(
            <TouchableOpacity onPress={callback} style={styles.MineItemStyle}>
                {/**左边**/}
                <Text>{leftText}</Text>
                {/**右边**/}
                    <Text style={{padding:10,marginRight:10}}>{rightText}</Text>

            </TouchableOpacity>
        )
    }

    /***
     * 个人头像
     * @param leftText
     * @param rightText
     * @param callback
     * @returns {XML}
     */
    static getPersonItemHead(leftText,icon,callback){
        return(
            <TouchableOpacity onPress={callback} style={[styles.MineItemStyle,{height:80}]}>
                {/**左边**/}
                <Text>{leftText}</Text>
                {/**右边**/}
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <Image  source={icon} style={styles.headImageStyle}/>
                    <Image style={{width:8,height:13}} source={require('../../../../image/rightback.png')}/>
                </View>
            </TouchableOpacity>
        )
    }

    /****
     * 获取个人中心的item
     * @param leftText
     * @param rightText
     * @param callback
     * @returns {XML}
     */
    static getPersonItem(leftText,rightText,callback){
        return(
            <TouchableOpacity onPress={callback} style={styles.MineItemStyle}>
                {/**左边**/}
                <Text>{leftText}</Text>
                {/**右边**/}
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <Text style={{padding:10}}>{rightText}</Text>
                    <Image style={{width:8,height:14}} source={require('../../../../image/rightback.png')}/>
                </View>
            </TouchableOpacity>
        )
    }

    static getToolBar(callback,title,rightText,rightCallBack){
        return (
            <View style={styles.mineToolBarStyle}>
                <TouchableOpacity style={styles.secondToolBarRight} onPress={callback}>
                    <Image source={require('../../../../image/back.png')}  style={{height:20,width:20,marginTop:Platform.OS=='ios'?20:8,marginLeft:20}}/>
                </TouchableOpacity>
                <Text style={styles.mineTitleStyle}>{title}</Text>
                <TouchableOpacity onPress={rightCallBack}>
                    <Text style={styles.mineTitleStyle}>{rightText}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    MineItemStyle:{

        height:54,
        backgroundColor:'white',
        borderBottomColor:'#BCBCBC',
        borderBottomWidth:1,
        //主轴对齐
        flexDirection:'row',
        justifyContent:'space-between',
        //垂直居中，是文字居中
        alignItems:'center',
        //组件在view中的边距
        padding:10
    },
    MiddleImageStyle:{
        //设置圆形图片的属性 4等分
        width:90,
        height:90,
        alignItems:'center',
        justifyContent:'center',
        margin:8,
        backgroundColor:'rgba(0, 0, 0, 0)'

    },
    headImageStyle:{
        //设置个人头像
        width:60,
        height:60,
        borderRadius:30,

    },

    mineToolBarStyle: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? 64 : 60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection: 'row'
    },
    mineTitleStyle: {
        color: 'white',
        fontSize: 18,
        marginTop: Platform.OS == 'ios' ? 20 : 10,
        marginRight:20
    },

});
