/**
 * Created by nbcei on 2017/4/26.
 * 问题反馈
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
export default class MyRanking extends Component {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'问题反馈',null,null)}
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
        backgroundColor: '#F5FCFF',
        flex:1,

    },
    map: {
        height: 700,
        borderWidth: 1,
        borderColor: '#000000',
    }
});