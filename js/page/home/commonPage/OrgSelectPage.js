/**
 * Created by Administrator on 2017/4/1.
 *  区域选择
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
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NetUtils from './../../utils/netUtils';

const ORGANIZATION_QUERY_CHILD = "Nbcei.Framework.Api.Impl/v1/organization/query/child";

export default class OrgSelectPage extends Component {

    constructor(props){
        super(props);
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.parentId = "ae14862e-6383-4d23-9a5d-cc3caaad7e99";
        this.next = true;
        this.state={
            dataArray:[],
            listData:[],
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <TouchableOpacity style={styles.rightToolBar} onPress={()=>{this.back()}}>
                        <Image source={require('../../../../image/back.png')} style={{height:20,width:20,marginLeft:20}}/>
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>区域选择</Text>
                    <TouchableOpacity onPress={()=>{alert("提交")}}>
                        <Text style={{height:20,width:30,marginTop:Platform.OS=='ios'?20:0,
                                    marginRight:20}}
                              onPress={()=>{
                                        this.props.onCallBack(1,1);
                                        this.props.navigator.pop()
                                    }}>提交</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(this.state.listData)}
                        enableEmptySections={true}
                        renderRow={(data)=>this.renderRow(data)}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    />
                </View>
                {/*<ScrollView>*/}
                    {/*{this.renderView()}*/}
                {/*</ScrollView>*/}
            </View>
        )
    }

    /**设置每个条目之间的分割线**/
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }

    //能在组件完成加载后进行获取数据
    componentDidMount(){
        this.getData(this.parentId)
    }

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
                        return
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

    renderRow(data){
            return(
                <TouchableOpacity onPress={()=>{this.getData(data.Id)}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                        <Text style={styles.itemTitleStyle}>{data.Name}</Text>
                        <Image style={{height:24,width:24,}} source={require('./../../../../image/rightback.png')}/>
                    </View>
                </TouchableOpacity>
            )
        }





    // renderView(){
    //
    //     if (!this.state.dataArray || this.state.dataArray.length === 0){
    //         return null;
    //     }
    //
    //     let len = this.state.dataArray.length;
    //     let views = [];
    //     for (let i = 0; i < len; i++){
    //         console.log("name:  "+this.state.dataArray[i].Name);
    //         views.push(
    //             <View key={i}>
    //                 <View>
    //                     {this.renderCheckBox(this.state.dataArray[i])}
    //                 </View>
    //                 <View style={styles.line}/>
    //             </View>
    //         )
    //     }
    //     return views;
    // }
    //
    //
    // onClick(data){
    //
    // }
    //
    // renderCheckBox(data){
    //     let leftText = data.Name;
    //     return(
    //         <CheckBox
    //             isChecked={false}
    //             style = {{flex:1,padding:10}}
    //             onClick={()=>this.onClick(data)}
    //             leftText={leftText}
    //             checkedImage={<Image style={{tintColor:'#00b3b3'}}
    //                         source={require('./../commonPage/image/ic_check_box.png')}/>}
    //             unCheckedImage={<Image style={{tintColor:'#00b3b3'}}
    //                         source={require('./../commonPage/image/ic_check_box_outline_blank.png')}/>}
    //         />
    //     )
    // }

    back(){
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },

    actionBar:{
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent:'space-between',
        height:Platform.OS=='ios'?64:60,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection:'row'
    },
    rightToolBar:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:Platform.OS=='ios'?20:10
    },

    titleStyle:{
        color:'white',
        fontSize:20,
        marginTop:Platform.OS=='ios'?20:0
    },

    itemTitleStyle:{
        fontSize:14,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'darkgray',
    }
});
