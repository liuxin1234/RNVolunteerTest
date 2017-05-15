/**
 * Created by nbcei on 2017/3/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
    ListView,
    RefreshControl,
    FlatView,
    Picker,
    TextInput

} from 'react-native';
import ViewUtil from '../utils/ViewUtils';

export default class FindPage extends Component {

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
        flex: 1,
    },
    button: {
        borderRadius: 4,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ccc',
        borderColor: '#333',
        borderWidth: 1,
    },
    buttonText: {
    }
});
