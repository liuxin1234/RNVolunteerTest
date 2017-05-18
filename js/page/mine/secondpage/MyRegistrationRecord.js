/**
 * Created by nbcei on 2017/4/26.
 * 我的报名记录
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
import SearchPage from '../../../common/SearchPage'
import BaseComponent from '../../../page/BaseComponent';
export default class ApplyProfessionalVolunteers extends BaseComponent {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'我的报名记录',require('../../../../image/magnifier.png'),()=>{this.search()})}
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
     * 搜索
     */
    search(){
        this.props.navigator.push({
            component:SearchPage

        })
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

