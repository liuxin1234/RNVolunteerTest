/**
 * Created by Administrator on 2017/5/8.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Navigator,
    TouchableHighlight,
    Text,
    ScrollView,
    Image,
    ListView,
} from 'react-native'
var Dimensions = require('Dimensions');
var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;
import RadioModal from 'react-native-radio-master';
import NetUtils from './../../utils/netUtils';
const ORGANIZATION_QUERY_CHILD = "Nbcei.Framework.Api.Impl/v1/organization/query/child";
var datas= [
    {
        "selecteId": 13,
        "content": "Apple",
        "selected": false
    },
    {
        "selecteId": 14,
        "content": "Banana",
        "selected": false
    },
    {
        "selecteId": 15,
        "content": "Orange",
        "selected": false
    },
    {
        "selecteId": 16,
        "content": "Watermelon",
        "selected": true
    },
    {
        "selecteId": 17,
        "content": "Grape",
        "selected": false
    }
]

export default class RadioModalItem extends Component{
    constructor(props){
        super(props);
        this.parentId = "ae14862e-6383-4d23-9a5d-cc3caaad7e99";
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.state = {
            language:datas[3].selecteId,
            item:datas[3].content,
            initItem:'选项a',
            initId:'0',
            listData:[]
        };
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

    renderList(rowData,rowID){
        return(
            <View style={styles.container}>
                <RadioModal
                    selectedValue={this.state.initId}
                    onValueChange={(rowID,rowData) => this.setState({initId: rowID,initItem:rowData})}
                    style={{
                          flexWrap:'wrap',
                          alignItems:'flex-start',
                          flex:1,
                          backgroundColor:'#ffffff',padding:5,marginTop:10
                          }}
                >
                    <Text value="0">{rowData.Name}</Text>
                </RadioModal>
            </View>
        )
    }
    // render(){
    //     return (
    //         <View style={{padding:20,flex:1,flexDirection:'column'}}>
    //             <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>
    //                 The selected:<Text style={{color:'#ff0000'}}>{this.state.item}</Text>
    //             </Text>
    //             <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>
    //                 Unique identification：<Text style={{color:'#ff0000'}}>{this.state.language}</Text>
    //             </Text>
    //             <RadioModal
    //                 options={{id:'selecteId',value:'content',disabled:'selected'}}
    //                 innerStyle={{width:(width-80)/2}}
    //                 txtColor={'#000000'}
    //                 noneColor={'#efefef'}
    //                 selectedValue={this.state.language}
    //                 onValueChange={(id,item) => this.setState({language: id,item:item})}
    //                 seledImg={require('./../commonPage/image/ic_check_box_outline_blank.png')}
    //                 selImg={require('./../commonPage/image/ic_check_box_outline_blank.png')}
    //                 selnoneImg={require('./../commonPage/image/ic_check_box.png')}
    //                 dataOption={datas}
    //                 style={{ flexDirection:'row',
		// 			flexWrap:'wrap',
		// 			alignItems:'flex-start',
		// 			flex:1,
		// 			backgroundColor:'#ffffff',padding:5,marginTop:10
		// 		}}
    //             />
    //             <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>
    //                 The selected:<Text style={{color:'#ff0000'}}>{this.state.initItem}</Text>
    //             </Text>
    //             <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>
    //                 Unique identification：<Text style={{color:'#ff0000'}}>{this.state.initId}</Text>
    //             </Text>
    //
    //         </View>
    //
    //     );
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
})