/**
 * Created by nbcei on 2017/4/26.
 * 我的关注
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    AsyncStorage,
    RefreshControl,
    ListView
} from 'react-native';
import ViewUtils from '../../utils/ViewUtils'
import SearchPage from '../../../common/SearchPage'
import Storage from 'react-native-storage';
const keyName = 'ActivityJobData';

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,


});
export default class MyAttention extends Component {
    constructor() {
        super();
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});

        this.state={
            listData:null,
            isLoading:true,

        }

    }
    componentDidMount() {
        this.onLoad()
    }

    /***
     * 从数据库中加载数据
     */
    onLoad(){
        storage.load({key:keyName,
            autoSync: true,
        }).then(data=>{
            let keyValue=JSON.stringify(data);
            console.log(keyValue);
            this.setState({
                listData:keyValue,
                isLoading:false
            })
        })

        console.log('keyValue'+this.state.listData)
    }

    render() {

        return (
            <View style={styles.container}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},'关于我们',require('../../../../image/magnifier.png'),()=>{this.search()})}
                <Text>{this.state.listData}</Text>
            </View>
        );
    }

    renderRow(data){
        let imgUrl = 'http://115.238.150.174:5019'+data.LstUrl.substring(1);
        return  (
            ViewUtils.getListViewItem(()=>{this.toDetailsPage(data)},data,imgUrl)
        )


    }
    /**设置每个条目之间的分割线**/
    renderSeparator(rowID,){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }
    /****
     * 返回
     */
    back(){
        this.props.navigator.pop();
    }

    /***
     * 搜索
     */
    search(){
        this.props.navigator.push({
            component:SearchPage

        })
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

