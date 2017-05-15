/**
 * Created by Administrator on 2017/5/12.
 */
import React, { Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
} from 'react-native';

export default class BaseComponent extends Component {
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }
}