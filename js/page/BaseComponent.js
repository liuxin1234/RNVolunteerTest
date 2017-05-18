/**
 * Created by Administrator on 2017/5/17.
 */
import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    BackAndroid,
    Platform
} from 'react-native';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(Platform.OS === 'android')BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
    }
    componentWillUnmount(){
        if(Platform.OS === 'android')BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid);
    }
    onBackAndroid = () => {
        this.props.navigator.pop();
        return true;
    };
}