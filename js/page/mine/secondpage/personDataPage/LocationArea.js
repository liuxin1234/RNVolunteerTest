/**
 * Created by nbcei on 2017/4/27.
 * 所属机构
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


import MyViewUtils from '../../utils/MyViewUtils'

export default class LocationArea extends Component {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {MyViewUtils.getToolBar(()=>{this.back()},'所属机构','提交',()=>{this.submit()})}
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
     * 提交
     */
    submit(){

    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,

        backgroundColor: '#F5FCFF',
    },
    map: {
        height: 700,
        borderWidth: 1,
        borderColor: '#000000',
    }
});

