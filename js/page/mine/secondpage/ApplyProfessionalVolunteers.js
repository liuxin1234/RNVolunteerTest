/**
 * Created by nbcei on 2017/4/26.申请专业志愿者
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Platform


} from 'react-native';
import ViewUtils from '../../utils/ViewUtils'
import {MineTags} from '../utils/MineTags'
import IntentionalType from'./ApplyProfessionalVolunteers/IntentionalType'
import IntentionalTime from'./ApplyProfessionalVolunteers/IntentionalTime'
import PoliticalOutlook from'./ApplyProfessionalVolunteers/PoliticalOutlook'
import ProfessionalAbility from'./ApplyProfessionalVolunteers/ProfessionalAbility'
import MyViewUtils from '../utils/MyViewUtils'
export default class ApplyProfessionalVolunteers extends Component {
    constructor() {
        super();

    }

    /****
     * 跳转页面的方法
     * @param tags
     */
    onClick(tags){
        let TargetComponent ={...this.props};
        switch (tags){
            case  MineTags.IntentionalTime:
                TargetComponent=IntentionalTime;
                break;
            case  MineTags.IntentionalType:
                TargetComponent=IntentionalType;
                break;
            case  MineTags.PoliticalOutlook:
                TargetComponent=PoliticalOutlook;
                break;
            case  MineTags.ProfessionalAbility:
                TargetComponent=ProfessionalAbility;
                break;
        }

        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
            });
        }
    }


    render() {

        return (
            <View style={styles.container}>
                {MyViewUtils.getToolBar(()=>{this.back()},MineTags.Apply_Professional_Volunteers)}
                <ScrollView>
                    <View style={styles.detailItemStyle}>
                        <Text style={[styles.detailLeftTextStyle,{marginLeft:28}]}>现工作单位:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='在此输入您的工作单位'
                                   underlineColorAndroid='transparent'
                                   multiline={true}

                        />
                    </View>
                    <View style={styles.detailItemStyle}>
                        <Text style={[styles.detailLeftTextStyle,{marginLeft:28}]}>现家庭地址:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='在此输入您的家庭地址'
                                   underlineColorAndroid='transparent'
                                   multiline={true}

                        />
                    </View>

                    {ViewUtils.getRegisterView(()=>{this.onClick(MineTags.PoliticalOutlook)},'政治面貌')}
                    {ViewUtils.getRegisterView(()=>{this.onClick(MineTags.IntentionalTime)},'意向时间')}
                    {ViewUtils.getRegisterView(()=>{this.onClick(MineTags.IntentionalType)},'意向类别')}
                    {ViewUtils.getRegisterView(()=>{this.onClick(MineTags.ProfessionalAbility)},'专业能力')}


                    <View style={{flexDirection:'row' ,justifyContent:'space-between',  borderBottomWidth:1,  borderColor:'#B3A0A7' }}>
                        <Text style={styles.detailLeftTextStyle}>手机号码:</Text>
                        <TextInput style={{  height:Platform.OS=="ios"?30:40,width:140,alignItems:'center',marginTop:12,fontSize:14,color:'#B3A0A7',}}
                                   placeholder='请输入手机号码'
                                   placeholderTextColor={'black'}
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                        />
                        <TouchableOpacity style={{alignItems:'center',marginTop:6,marginRight:6}}>
                            <Text style={{padding:12,borderColor:'#00b3b3',borderRadius:4,borderWidth:2,paddingTop:10}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailItemStyle}>
                        <Text style={styles.detailLeftTextStyle}>验证码:</Text>
                        <TextInput style={styles.detailInputTextStyle}
                                   placeholder='请输入验证码'
                                   placeholderTextColor={'black'}
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                        />
                    </View>
                    <View style={{  flexDirection: 'row', justifyContent: 'center', alignItems:'center',marginTop:16}}>
                        <Text style={{color: '#00b3b3'}}>注册表示您同意</Text>
                        <Text >《宁波市注册志愿者管理办法》</Text>
                    </View>

                    <TouchableOpacity style={styles.ButtonViewStyle} onPress={()=>{this.applyProfessionalVolunteers()}}>
                            <Text style={styles.ButtonTextStyle}>申请</Text>
                    </TouchableOpacity>
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


    /****
     * 申请专业志愿者
     */
    applyProfessionalVolunteers(){
        /***
         * 现判断单选框是否选中，选中才能申请
         */
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F5FCFF',
    },
    detailItemStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#B3A0A7'

    },
    detailLeftTextStyle:{
        color:'black',
        textAlign:'center',
        fontSize:16,
        padding:16,
        paddingLeft:10
    },

    detailInputTextStyle:{
        height:Platform.OS=="ios"?30:40,
        width:280,
        alignItems:'center',
        marginTop:Platform.OS=='ios'?10:0,
        fontSize:14,
        color:'#B3A0A7',
        marginLeft:10
    },

    ButtonViewStyle:{
        //设置注册按钮外边框
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        marginBottom:5,
        borderRadius:10
    },

    ButtonTextStyle:{
        //注册按钮设置
        fontSize:16,
        color:'white',
        backgroundColor:'#00b3b3',
        textAlign:'center',
        padding:10,
        marginTop:10
    }
});

