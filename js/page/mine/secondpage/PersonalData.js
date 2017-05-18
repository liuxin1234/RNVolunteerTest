/**
 * Created by nbcei on 2017/4/26.
 * 个人资料
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import ViewUtils from '../../utils/ViewUtils'
import  MyViewUtils from'../utils/MyViewUtils'
import {MineTags} from '../utils/MineTags'
import MyNickName from './personDataPage/MyNickName'
import LocationArea from './personDataPage/LocationArea'
import MyMailBox from './personDataPage/MyMailBox'
import MyPhone from './personDataPage/MyPhone'
import ModifyPassword from './personDataPage/ModifyPassword'
import Person from './personDataPage/Person'
import SubordinateInstitution from './personDataPage/SubordinateInstitution'

import BaseComponent from '../../../page/BaseComponent';
export default class PersonalData extends BaseComponent {
    constructor() {
        super();

    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'个人资料',null,null)}
                <ScrollView>
                    {MyViewUtils.getPersonItemHead('我的头像',require('../../../../image/personal_no_portrait.png'),()=>{this.onClick()})}

                    {MyViewUtils.getPersonItem('我的昵称','万吧',()=>{this.onClick(MineTags.My_Nick_Name)})}
                    {MyViewUtils.getPersonItem('修改密码','',()=>{this.onClick(MineTags.ModifyPassword)})}
                    {MyViewUtils.getPersonItem('我的手机','13958219810',()=>{this.onClick(MineTags.My_Phone)})}
                    {MyViewUtils.getPersonItem('我的邮箱','953675907@qq.com ',()=>{this.onClick(MineTags.My_MailBox)})}

                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>
                    {MyViewUtils.getPersonItemNoMore('我的昵称','刘欣',null)}
                    {MyViewUtils.getPersonItemNoMore('身份证','4405',null)}

                    {MyViewUtils.getPersonItem('个人属性','在职',()=>{this.onClick(MineTags.Person)})}
                    {MyViewUtils.getPersonItem('所在区域','江东区',()=>{this.onClick(MineTags.LocationArea)})}
                    {MyViewUtils.getPersonItem('所属机构','市国土资源局',()=>{this.onClick(MineTags.SubordinateInstitution)})}


                </ScrollView>
            </View>
        );
    }
    /****
     * 返回
     */
    back(){
        this.props.navigator.pop();
    }

    onClick(tags){
        let TargetComponent ={...this.props};
        switch (tags){
            case  MineTags.My_Nick_Name:
                TargetComponent=MyNickName;
                break;
            case  MineTags.My_MailBox:
                TargetComponent=MyMailBox;
                break;
            case  MineTags.My_Phone:
                TargetComponent=MyPhone;
                break;
            case  MineTags.LocationArea:
                TargetComponent=LocationArea;
                break;
            case  MineTags.ModifyPassword:
                TargetComponent=ModifyPassword;
                break;
            case  MineTags.Person:
                TargetComponent=Person;
                break;
            case  MineTags.SubordinateInstitution:
                TargetComponent=SubordinateInstitution;
                break;
        }

        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
            });
        }
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