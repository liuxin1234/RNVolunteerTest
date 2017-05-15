/**
 * Created by nbcei on 2017/4/17.
 *
 * 获取共同组件的工具类
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
export default class ViewUtils {

    static getHomeMiddleView(callback, icon, first, second) {
        return ( <TouchableOpacity style={styles.middleViewStyle} onPress={callback}>
            <Image source={icon} style={styles.middleImageStyle}/>
            <Text style={styles.middleTextStyle}>{first}</Text>
            <Text style={styles.middleSecondTextStyle}>{second}</Text>
        </TouchableOpacity>)
    }

    /****
     * 得到首页标题栏
     */

    static getMainToolBar(callback, rightIcon, rightCallBack) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.rightToolBar} onPress={callback}>
                    <Image source={require('../../../image/scan.png')} style={{height:20,width:20}}/>
                    <Text style={{color:'white',fontSize:10}}>扫一扫</Text>
                </TouchableOpacity>
                <Text style={styles.titleStyle}>宁波志愿者服务平台</Text>
                <TouchableOpacity onPress={rightCallBack}>
                    <Image source={rightIcon} style={{height:20,width:20,marginTop:Platform.OS=='ios'?20:8}}/>

                </TouchableOpacity>


            </View>
        )
    }

    /****
     * 二级标题
     */

    static getSecondToolBar(callback, title, rightIcon, rightCallBack) {
        return (
            <View style={styles.secondTitleContainer}>
                <TouchableOpacity style={styles.secondToolBarRight} onPress={callback}>
                    <Image source={require('../../../image/back.png')} style={{height:20,width:20}}/>
                </TouchableOpacity>
                <Text style={styles.titleStyle}>{title}</Text>
                <TouchableOpacity onPress={rightCallBack}>
                    <Image source={rightIcon}
                           style={{height:20,width:20,marginTop:Platform.OS=='ios'?20:8,marginRight:20}}/>

                </TouchableOpacity>

            </View>
        )
    }

    /****
     * 首页ListView的item
     */
    static getListViewItem(callback, data, imgUrl) {
        /**等于0返回活动否则返回岗位***/

        return (
            <TouchableOpacity onPress={callback} style={{}}>
                <Image style={styles.bottomStyle} source={{uri:imgUrl}}>

                    <Text style={styles.leftStyle}>{this.listType(data.Type)}</Text>

                    <View style={styles.rightStyle}>
                        <Text style={styles.textTopStyle}>{data.ActivityTypeName}</Text>
                        <View style={styles.rightBottomStyle}>
                            <View style={{flexDirection:'row',backgroundColor:'#00b3b3'}}>
                                <Text style={styles.textBottomStyle}>活动招募人数</Text>
                                <Text style={styles.numberBottomStyle}>0/15</Text>
                            </View>

                            <View style={{flexDirection:'row',backgroundColor:'#00b3b3'}}>
                                <Text style={styles.textBottomStyle}>活动服务时长</Text>
                                <Text style={styles.numberBottomStyle}>2时</Text>
                            </View>

                            <Text style={styles.textBottomStyle}>进行中</Text>
                        </View>
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }

    static listType(type) {
        if (type === 0) {
            return "活动"
        } else {
            return "岗位"
        }
    }

    /****
     * 详情页面的item
     * @param leftText
     * @param rightText
     * @returns {XML}
     */
    static getDetailItem(leftText, rightText) {
        return (
            <View style={styles.detailItemStyle}>
                <Text style={styles.detailLeftTextStyle}>{leftText}</Text>
                <Text style={styles.detailRightTextStyle}>{rightText}</Text>
            </View>
        )
    }

    /****
     * 注册页面有TextInput的
     */
    static getRegisterTextInput(leftText,placeholderText,tag) {
        return (
            <View style={styles.detailItemStyle}>
                <Text style={styles.detailLeftTextStyle}>{leftText}</Text>
                <TextInput style={styles.detailInputTextStyle}
                           placeholder={placeholderText}
                           placeholderTextColor={'black'}
                           underlineColorAndroid='transparent'
                           multiline={true}
                           onChangeText={(text)=>{this.getInputText(text,tag)}}
                />
            </View>)
    }

    /****
     * 获取TextInput的值
     */
    static getInputText(text,tag){

    }
    /****
     * 注册页面没有TextInput
     */
    static getRegisterView(callback, text) {
        return (
            <TouchableOpacity
                style={{flexDirection:'row' ,justifyContent:'space-between',  borderBottomWidth:1,  borderColor:'#B3A0A7',alignItems:'center' }}
                onPress={callback}
            >
                <Text style={styles.registerLeftTextStyle}>{text}</Text>
                <Image style={{width:8,height:14,marginRight:10}} source={require('./../../../image/rightback.png')}/>
            </TouchableOpacity>
        )
    }

    static getDetailBottom(rightCallBack,midCallBack,leftCallBack,rightText){
        return(
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={rightCallBack}>
                    <Text style={styles.bottomTextStyles}>分享</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={midCallBack}>
                    <Text style={[styles.bottomTextStyles,{backgroundColor:'#0BAAFE',color:'white'}]}>我要报名</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={leftCallBack}>
                    <Text style={styles.bottomTextStyles}>{rightText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent: 'space-around',
        height: Platform.OS == 'ios' ? 64 : 60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection: 'row'
    },
    secondTitleContainer: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? 64 : 60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection: 'row',
        elevation:10

    },
    secondToolBarRight: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS == 'ios' ? 20 : 10,
        marginLeft: 20
    },
    rightToolBar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS == 'ios' ? 20 : 10
    },
    titleStyle: {
        color: 'white',
        fontSize: 18,
        marginTop: Platform.OS == 'ios' ? 20 : 10
    },
    middleViewStyle: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 100,
        borderWidth: 0.5,
        borderColor: '#B3A0A7'

    },
    middleImageStyle: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleTextStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        fontSize: 18,
    },
    middleSecondTextStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        fontSize: 12,
    },
    bottomStyle: {
        flexDirection: 'row',
        height: 160,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: ScreenWidth,
        marginBottom: 2
    },

    leftStyle: {
        backgroundColor: '#00b3b3',
        textAlign: 'center',
        color: 'white',
        marginLeft: 4,
        padding: 20,

    },
    rightStyle: {
        height: ScreenWidth * 0.2,
        width: ScreenWidth * 0.78,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'

    },
    textTopStyle: {
        height: 20,
        width: ScreenWidth * 0.8,
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)'

    },
    rightBottomStyle: {
        height: ScreenWidth * 0.1,
        width: ScreenWidth * 0.78,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    textBottomStyle: {
        backgroundColor: '#00b3b3',
        color: 'white',
        padding: 6,
        fontSize: 12,
    },
    numberBottomStyle: {
        backgroundColor: '#050416',
        color: 'white',
        height: 20,
        width: 20,
        paddingTop: 4,
        fontSize: 8,
        marginTop: 3,
        marginRight: 3,
        textAlign: 'center',

    },
    detailItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#B3A0A7',
        borderBottomWidth:1

    },
    detailLeftTextStyle: {
        color: '#00b3b3',
        textAlign: 'center',
        fontSize: 18,
        padding: 16,

    },
    registerLeftTextStyle: {
        color:'black',
        textAlign:'center',
        fontSize:16,
        padding:16,
        paddingLeft:Platform.OS == 'ios' ?10:24
    },
    detailRightTextStyle: {
        color: '#B3A0A7',
        marginRight: 20,
        textAlign: 'left'
    },
    detailInputTextStyle:{
        height:Platform.OS=="ios"?30:40,
        width:280,
        alignItems:'center',
        marginTop:Platform.OS=='ios'?10:0,
        fontSize:14,
        color:'#B3A0A7',
        marginLeft:10
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
