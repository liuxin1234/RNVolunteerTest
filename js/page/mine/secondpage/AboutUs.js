/**
 * Created by nbcei on 2017/4/26.
 * 关于我们
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import ViewUtils from '../../utils/ViewUtils'
var ScreenWidth = Dimensions.get('window').width;
import BaseComponent from '../../../page/BaseComponent';
export default class AboutUs extends BaseComponent {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'关于我们',null,null)}
                <View style={styles.containerMoreStyle}>
                    <Image style={{width:ScreenWidth,height:140}} source={require('../../../../image/img_unload.png')}/>
                    <Text style={styles.textStyle}>版本号:1.3.0</Text>
                    <Text style={styles.textStyle}>主办方：宁波市团委</Text>
                    <Text style={styles.textStyle}>官方网站:www.nbzyz.org</Text>
                </View>
            </View>
        );
    }
    /****
     * 返回
     */
    back(){
        this.props.navigator.pop();
    }


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F5FCFF',

    },
    containerMoreStyle:{
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle:{
        padding:10,
        fontSize:16
    }
});

