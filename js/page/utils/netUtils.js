/**
 * Created by nbcei on 2017/3/21.
 */
/**
 * NetUitl 网络请求的实现
 * @author lidong
 * @date 2016-03-17
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';

const BASIC="NWI5Mzk3N2QtNDJhNy00NmZlLTliNjktOTFkOWQwMTQyZmI2Ok1wVXVzR2dHNys2WERpVnRXalpZM1E9PQ==";
const ACCESSTOKEN_URL="http://115.238.150.174:5019/token";
const SERVER_URL="http://115.238.150.174:5019/api/";

export default class NetUitl{

    /**
     * post请求  请求票据接口方法
     * @param userData
     * @returns {Promise}
     */
    static  postFromTaken(userData) {
        let params = "grant_type=client_credentials";
        let Token_body = null;
        /***
         * 设置头信息
         * @type {any}
         */
        let headers = new Headers();
        headers.append("Authorization","Basic "+BASIC);
        headers.append("Cache-Control", "no-cache");
        if (userData!==null){
                    Token_body = userData;
                }else {
                    Token_body = params;
                }
        let opts = {
            method:"POST",
            body:Token_body,
            mode:"cors",
            headers:headers,
        };
        //new Promise((resolve,reject)这是一个异步的
        return new Promise((resolve,reject)=> {
            fetch(ACCESSTOKEN_URL, opts)
                .then((response) => {
                    return response.json();
                })
                .then((responseJson) => {
                    //console.log("票据JSON数据: "+JSON.stringify(responseJson));
                    resolve(responseJson);
                })
                .catch((error) => {
                    reject(error);
                }).done();
        })
    }

    /**
     * post请求  请求Api接口的方法
     * @param Api：接口地址
     * @param data：传参
     * @param Access_Token：票据
     * @returns {Promise}
     */
    static  postJson(Api, data, Access_Token) {
            let access_token = Access_Token;
            let headers = new Headers();
            headers.append("Authorization", "Bearer " + access_token);
            headers.append("Content-Type", "application/json" );

            let opts = {
                method: "POST",
                body: JSON.stringify(data),
                type:'json',
                mode:"cors",
                headers: headers
            };
        return new Promise((resolve,reject)=> {
            fetch(SERVER_URL + Api, opts)
                .then((response) => {
                    //console.log("res: " + JSON.stringify(response));
                    return response.json()
                })
                .then((responseJson) => {
                    console.log("responseJson: " + JSON.stringify(responseJson));
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log("error: " + error);
                    reject(error)
                }).done();
        })

    }

    /**
     * Api接口调用的get请求：
     *
     * //拼接参数
     *   Object.keys(data).forEach(key => paramsArray.push(key+"="+data[key]));
     *    这里的话就相当于例如：id=551213463
     * @param Api：接口地址
     * @param data：传参
     * @param Access_Token：票据
     * @returns {Promise}
     */
    static  getJson(Api, data, Access_Token) {
        var access_token = Access_Token;
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + access_token);
        headers.append("Content-Type", "application/json" );
        // console.log("请求头信息："+JSON.stringify(headers));
        //console.log("提交的参数：" + JSON.stringify(data));
        // console.log("票据：" + access_token);
        if (data) {
            let paramsArray = [];
            //拼接参数
            Object.keys(data).forEach(key => paramsArray.push(data[key]));
            //判断是否找到“？”
            if (Api.search(/\?/) === -1) {
                Api += '/' + paramsArray.join('/')
            } else {
                Api += '&' + paramsArray.join('&')
            }
        }
        console.log("API: "+Api);
        var opts = {
            method: "GET",
            type:'json',
            mode:"cors",
            headers: headers
        };
        return new Promise((resolve,reject)=> {
            fetch(SERVER_URL + Api, opts)
                .then((response) => {
                    //console.log("res: " + JSON.stringify(response));
                    return response.json()
                })
                .then((responseJson) => {
                    console.log("responseJson: " + JSON.stringify(responseJson));
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log("error: " + error);
                    reject(error)
                }).done();
        })

    }
}

module.exports = NetUitl;