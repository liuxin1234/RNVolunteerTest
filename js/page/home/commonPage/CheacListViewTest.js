/**
 * Created by Administrator on 2017/5/5.
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
    ScrollView,
    ListView,
    TouchableHighlight
} from 'react-native';
import CheckboxList from '../utils/CheckboxList'
import NetUtils from './../../utils/netUtils';

const ORGANIZATION_QUERY_CHILD = "Nbcei.Framework.Api.Impl/v1/organization/query/child";
var dataArray=[];
export default class CheacListViewTest extends Component {

    constructor(props) {
        super(props);
        //this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.parentId = "ae14862e-6383-4d23-9a5d-cc3caaad7e99";
        this.state = {
            listData:[],
        }
    }

    //能在组件完成加载后进行获取数据
    componentDidMount(){
        this.getData(this.parentId)
    }

    render(){

        console.log("listName: "+this.state.listData.Name);
        return(
            <View style={styles.container}>
                <CheckboxList
                    options={this.state.listData}
                    maxSelectedOptions={1}
                    onSelection={(option)=>alert(option + ' was selected!')}
                />
            </View>
        )
    };


    //获取数据
    getData(parentId){
        NetUtils.postFromTaken(null).then(jsonData=>{
            if (jsonData){
                let token = jsonData.access_token;
                let params = {"parentId":""+parentId};
                NetUtils.getJson(ORGANIZATION_QUERY_CHILD,params,token).then(jsonData=>{
                    console.log("获取到的数据: "+jsonData.Data.length);
                    if (jsonData.Data === null || jsonData.Data.length <= 0){
                        alert("已经最后一页了");
                        return;
                    }else {
                        this.setState({
                            listData:jsonData.Data
                        });
                        dataArray = jsonData.Data;
                        console.log("jsonData: "+JSON.stringify(dataArray));
                        console.log("listName1: "+dataArray.Name);
                    }
                }).catch(error=>{
                    alert(error)
                }).done()
            }
        }).catch(error=>{
            alert(error)
        }).done()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    listRow:{
        flexDirection: 'row',
    },
    rightContainer:{
        marginLeft:20
    }
});