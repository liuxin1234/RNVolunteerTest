/**
 * Created by Administrator on 2017/3/24.
 */
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


const Base_Url='http://115.238.150.174:5019';
export const Api={

    Base_Url:'http://115.238.150.174:5019',
    /**搜索界面的活动APi*/
    SearchPage_Activity:Base_Url+'/api/Nbcei.Plugin.NbVolunteer.Api.Impl/v1/activity/query',
    /**搜索界面的组织APi*/
    SearchPage_Organization:'/api/Nbcei.Plugin.NbVolunteer.Api.Impl/v1/company/query',
    /**搜索界面的岗位APi*/
    SearchPage_Job:Base_Url+'/api/Nbcei.Plugin.NbVolunteer.Api.Impl/v1/activity/query',


};