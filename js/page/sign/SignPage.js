/**
 * Created by nbcei on 2017/3/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    MapView,

} from 'react-native';
import ViewUtil from '../utils/ViewUtils';

export default class Sign_in extends Component {
    constructor() {
        super();
        this.state = {
            textInputValue: ''
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtil.getMainToolBar(()=>{this.scan()},require('../../../image/magnifier.png'),()=>{this.search()})}
                <MapView
                    style={styles.map}
                    onRegionChangeComplete={()=>{}}
                    region={{
          latitude: 40.027737,
          longitude:116.403694,
          latitudeDelta: 1,
          longitudeDelta: 0.5,
        }}
                    annotations={[{
          longitude: 116.403694,
          latitude: 40.027737,
          title: 'I am Here!',
        }]}
                />
            </View>
        );
    }
    /****
     * 扫一扫二维码
     */
    scan(){
        alert("ddd")
    }

    /***
     * 跳转到收缩页面
     */
    search(){
        alert("ddd")
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    map: {
        height: 700,
        borderWidth: 1,
        borderColor: '#000000',
    }
});

// 输出组件类
module.exports = Sign_in;