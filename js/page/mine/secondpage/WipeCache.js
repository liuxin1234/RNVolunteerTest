/**
 * Created by nbcei on 2017/4/26.
 * 清楚缓存
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
export default class WipeCache extends Component {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'清除缓存',null,null)}
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