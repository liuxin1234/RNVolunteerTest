/**
 * Created by Administrator on 2017/4/1.
 *  个人属性
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NetUtils from './../../utils/netUtils';
import BaseComponent from '../../../page/BaseComponent';
const DICTIONARYTYPE_QUERY_DEFAULT = "Nbcei.Framework.Api.Impl/v1/dictionary/query/default/bycode";

export default class AttributePage extends BaseComponent {

    constructor(props){
        super(props);
        this.changeNameValues = [];
        this.changeCodeValues = [];
        this.state={
            dataArray:[],
            selectData:[]
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <TouchableOpacity style={styles.rightToolBar} onPress={()=>{this.back()}}>
                        <Image source={require('../../../../image/back.png')} style={{height:20,width:20,marginLeft:20}}/>
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>个人属性</Text>
                    <TouchableOpacity onPress={()=>{alert("提交")}}>
                        <Text style={{height:20,width:30,marginTop:Platform.OS=='ios'?20:0,
                                    marginRight:20}}
                                    onPress={()=>{
                                        this.props.onCallBack(this.changeNameValues,this.changeCodeValues);
                                        this.props.navigator.pop()
                                    }}>提交</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }

    //能在组件完成加载后进行获取数据
    componentDidMount(){
        this.getData()
    }

    //获取数据
    getData(){
        NetUtils.postFromTaken(null).then(jsonData=>{
            if (jsonData){
                let token = jsonData.access_token;
                let params = {"typeCode":"PersonAttribute","parentId":"00000000-0000-0000-0000-000000000000"};
                NetUtils.getJson(DICTIONARYTYPE_QUERY_DEFAULT,params,token).then(jsonData=>{
                    if(jsonData){
                        this.setState({
                            dataArray:jsonData.Data
                        })
                    }
                }).catch(error=>{
                    alert(error)
                }).done()
            }
        }).catch(error=>{
            alert(error)
        }).done()
    }

    renderView(){

        if (!this.state.dataArray || this.state.dataArray.length === 0){
            return null;
        }

        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0; i < len; i++){
            views.push(
                <View key={i}>
                    <View>
                        {this.renderCheckBox(this.state.dataArray[i])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }

    //多选数据处理
    onClick(data){
        for (var i=0;i<this.changeNameValues.length;i++){
            //取出数组中的元素
            var tempName = this.changeNameValues[i];
            var tempCode = this.changeCodeValues[i];
            if (tempName === data.Name){
                //判断如果数组中的元素，包含用户选中的元素，把它从数组中移除掉
                this.changeNameValues.splice(i,1);
                return;
            }
            if (tempCode === data.Code){
                this.changeCodeValues.splice(i,1);
                return;
            }
        }
        //如果数组中不包含用户所选的元素，则把它放入到数组里面去
        this.changeNameValues.push(data.Name);
        this.changeCodeValues.push(data.Code);
        console.log("选中的数量："+JSON.stringify(this.changeNameValues));
        console.log("选中的Code："+JSON.stringify(this.changeCodeValues));

    }

    renderCheckBox(data){
        let leftText = data.Name;
        return(
            <CheckBox
                isChecked={false}
                style = {{flex:1,padding:10}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                checkedImage={<Image style={{tintColor:'#00b3b3'}}
                            source={require('./../commonPage/image/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor:'#00b3b3'}}
                            source={require('./../commonPage/image/ic_check_box_outline_blank.png')}/>}

            />
        )
    }

    back(){
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },

    rightToolBar:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:Platform.OS=='ios'?20:10
    },

    actionBar:{
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent:'space-between',
        height:Platform.OS=='ios'?64:60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection:'row'
    },

    titleStyle:{
        color:'white',
        fontSize:20,
        marginTop:Platform.OS=='ios'?20:0
    },

    itemTitleStyle:{
        fontSize:16,
        padding:10,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'darkgray',
    }
});
