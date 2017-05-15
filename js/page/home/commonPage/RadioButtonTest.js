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
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import NetUtils from './../../utils/netUtils';

const ORGANIZATION_QUERY_CHILD = "Nbcei.Framework.Api.Impl/v1/organization/query/child";
var CheckBoxData=[];
export default class RadioButtonTest extends Component {

    constructor(props) {
        super(props);
        //this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.parentId = "ae14862e-6383-4d23-9a5d-cc3caaad7e99";
        this.state = {
            dataArray: [],
            listData:[],
            text: '',
        }
        this.onSelect = this.onSelect.bind(this)
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

                <Text style={styles.text}>{this.state.text}</Text>
            </View>
        )
    };

    /**设置每个条目之间的分割线**/
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }

    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }

    renderList(rowData,rowID){
        return(
            <View style={styles.container}>
                <RadioGroup
                     onSelect = {(rowID, rowData) => this.onSelect(rowID, rowData)}
                   >
                    <RadioButton value={rowData.Name} >
                        <Text>{rowData.Name}</Text>
                    </RadioButton>
                </RadioGroup>

            </View>
        )
    }


    // onSelect(index, value){
    //            this.setState({
    //                  text: `Selected index: ${index} , value: ${value}`
    //          })
    //        }
    //
    // render(){
    //     return(
    //         <View style={styles.container}>
    //                      <RadioGroup
    //                          onSelect = {(index, value) => this.onSelect(index, value)}
    //                      >
    //                          <RadioButton value={'item1'} >
    //                                <Text>This is item #1</Text>
    //                         </RadioButton>
    //
    //                         <RadioButton value={'item2'}>
    //                                  <Text>This is item #2</Text>
    //                          </RadioButton>
    //
    //                          <RadioButton value={'item3'}>
    //                                  <Text>This is item #3</Text>
    //                         </RadioButton>
    //
    //                      </RadioGroup>
    //
    //                      <Text style={styles.text}>{this.state.text}</Text>
    //         </View>
    //     )
    // }



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