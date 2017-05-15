/**
 * Created by nbcei on 2017/4/26.
 * 常见问题界面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import ViewUtils from '../../utils/ViewUtils'
import MyViewUtils from '../utils/MyViewUtils'
export default class CommonProblem extends Component {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'常见问题',null,null)}
                {MyViewUtils.getMineItem('登录后完善信息',()=>{this.toCommonProblemDetail()})}
            </View>
        );
    }
    /****
     * 返回
     */
    back(){
        this.props.navigator.pop();
    }

    /***
     * 跳转到常见问题到二级页面
     */
    toCommonProblemDetail(){

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex:1,

    },
    map: {
        height: 700,
        borderWidth: 1,
        borderColor: '#000000',
    }
});

// 输出组件类
module.exports = CommonProblem;