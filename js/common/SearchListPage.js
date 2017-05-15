/**
 * Created by nbcei on 2017/4/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
    ListView,
    RefreshControl,
    FlatView,
    Picker,
    TextInput

} from 'react-native';
import ViewUtil from '../page/utils/ViewUtils'
import ActivityDetailsPage from '../page/home/activityPage/ActivityDetailsPage';
import JobDetailsPage from '../page/home/activityPage/JobDetailsPage';

export default class SearchListPage extends Component {

    constructor() {
        super();
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
        this.state = {
            data:[]
        }
    }

    render() {
        return (
            <View style={styles.container}
            >
                <View style={styles.topViewStyle}>
                    <TextInput style={styles.textInputStyle}
                               placeholder={this.props.text}

                    />
                    <TouchableOpacity onPress={()=>{this.back()}}>

                        <Text style={{padding:10,alignItems:'center',marginTop:10,fontSize:20 }}>返回</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={this.dataSource.cloneWithRows(this.props.detailsData)}
                    renderRow={(data)=>this.renderRow(data)}

                />

            </View>
        );
    }
    renderRow(data){
        let imgUrl = 'http://115.238.150.174:5019'+data.PcLstUrl.substring(1);
        console.log(imgUrl);
        if (this.props.tag===2){
            /**是组织跳转过来的**/
            let orImgUrl = 'http://115.238.150.174:5019'+data.AppLstUrl.substring(1);
            console.log('组织'+JSON.stringify(data));

            return(ViewUtil.getOrganozationItem(()=>{this.toOrDetailsPage(data)},data,orImgUrl))
        }else {
            /***活动或者岗位跳转过来**/
            return  (
                ViewUtil.getListViewItem(()=>{this.toDetailsPage(data)},data,imgUrl)
            )
        }



    }

    /***
     *进入到组织的详情页
     * @param data
     */
    toOrDetailsPage(data){

    }
    /***
     * 进入到活动或者岗位的详情页
     * @param data
     */
    toDetailsPage(data){
        /**data.Type===0活动，===1岗位 **/
       if(data.Type===0){
           this.props.navigator.push({
               component:ActivityDetailsPage,
               params:{
                   detailsData:data,
               }

           })
       } else {
           this.props.navigator.push({
               component:JobDetailsPage,
               params:{
                   detailsData:data
               }
           })
       }
    }
    back(){
        this.props.navigator.pop();

    }

}


const styles = StyleSheet.create({
    container: {
        //设置整个界面的背景
        flex: 1,
        backgroundColor: '#D9D9D9',
        justifyContent: 'flex-start'
    },
    topViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: Platform.OS == 'ios' ? 74 : 54,//如果系统是iOS高度就是64不是iOS高度就是44
        borderBottomWidth: 1
    },
    textInputStyle: {
        width: 280,
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        marginTop:Platform.OS=='ios'? 24:4
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 40
    },
    textItemStyle: {

        borderWidth: 1,
        borderRadius: 4,
        padding: 3,
        paddingLeft: 20,
        paddingRight: 20
    },
});
