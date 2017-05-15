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
import CheckBox from 'react-native-check-box';
import NetUtils from './../../utils/netUtils';

const ORGANIZATION_QUERY_CHILD = "Nbcei.Framework.Api.Impl/v1/organization/query/child";
var CheckBoxData=[];
export default class CheckBoxTest extends Component {

    constructor(props) {
        super(props);
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.parentId = "ae14862e-6383-4d23-9a5d-cc3caaad7e99";
        this.state = {
            dataArray: [],
            listData:[],
        }
    }

    //能在组件完成加载后进行获取数据
    componentDidMount(){
        this.getData(this.parentId)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(this.state.listData)}
                        renderRow={this.renderList.bind(this)}
                        initialListSize={20}
                        enableEmptySections={true}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                        style={styles.listView}/>
                </View>
            </View>
        )
    };

    /**设置每个条目之间的分割线**/
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }

    initCheckBoxData(checkbox){

        if(checkbox!=null){
            CheckBoxData.push(checkbox);
        }
    };
    renderList(rowData,rowID) {
        return (
            <View style={styles.listRow} >
                <View>
                    <CheckBox
                        ref={(c)=>this.initCheckBoxData(c)}
                        isChecked={false}
                        style = {{flex:1,padding:10}}
                        onClick={(checked) => this.checkSelect(checked,rowID,rowData)}
                        checkedImage={<Image style={{tintColor:'#00b3b3'}}
                            source={require('./../commonPage/image/ic_check_box.png')}/>}
                        unCheckedImage={<Image style={{tintColor:'#00b3b3'}}
                            source={require('./../commonPage/image/ic_check_box_outline_blank.png')}/>}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <Text >{rowData.Name}</Text>
                </View>
            </View>
        );
    };

    checkSelect(checked,id,rowData){

        console.log(checked+",,,,"+id+"....."+rowData);

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