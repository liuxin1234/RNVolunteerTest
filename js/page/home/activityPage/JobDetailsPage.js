/**
 * Created by nbcei on 2017/3/28.
 *
 * 岗位的详情页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView,
    AsyncStorage
} from 'react-native';
var Dimensions = require('Dimensions');
import ViewUtils from '../../utils/ViewUtils'
var ScreenWidth = Dimensions.get('window').width;
import HTMLView from 'react-native-htmlview';
const keyName = 'ActivityJobData';
import Storage from 'react-native-storage';
var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
});
export default class JobDetailPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            attention:'关注'
        }
    }
    render() {
        var imgUrl = 'http://webapi.nbzyz.org'+this.props.detailsData.PcLstUrl.substring(1);

        return (
            <View style={{backgroundColor:'white',flex: 1}}>
                {ViewUtils.getSecondToolBar(()=>{this.back()},this.titleView(),require('../../../../image/magnifier.png'),()=>{this.search()})}

                <ScrollView >
                    {ViewUtils.getListViewItem(null,this.props.detailsData,imgUrl)}
                    {ViewUtils.getDetailItem('岗位类型',this.props.detailsData.ActivityTypeName)}
                    {ViewUtils.getDetailItem('岗位报名时间',this.props.detailsData.StartTime)}
                    {ViewUtils.getDetailItem('岗位有效时间',this.props.detailsData.FinishTime)}
                    {ViewUtils.getDetailItem('服务时间',this.props.detailsData.DaySTime+"-"+this.props.detailsData.DayETime)}
                    {ViewUtils.getDetailItem('岗位服务地址',this.props.detailsData.Addr)}
                    {ViewUtils.getDetailItem('岗位发起单位',this.props.detailsData.StartTime)}
                    {ViewUtils.getDetailItem('联系方式',this.props.detailsData.Mobile)}
                    {ViewUtils.getDetailItem('服务专业技能',this.props.detailsData.StartTime)}


                    <View>
                        <Text style={{color:'#00b3b3',fontSize:16,padding:10,
                                borderWidth:0.4,borderColor:'#B9BBBF'}}>
                            注：掌握专业技能的优先考虑，所有用户都可以报名
                        </Text>
                    </View>


                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>
                    <Text style={{color:'#ff5114',fontSize:16,padding:10,
                                borderWidth:1,borderColor:'#B9BBBF'}}>岗位要求</Text>
                    <HTMLView
                        value={this.props.detailsData.JobText}
                    >
                    </HTMLView>

                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>
                    <Text style={{color:'#ff5114',fontSize:16,padding:20,
                                borderWidth:1,borderColor:'#B9BBBF'}}>岗位详情</Text>
                    <HTMLView
                        value={this.props.detailsData.Text}
                    >
                    </HTMLView>
                    <View style={{backgroundColor:'#d9d9d9',height:10}}/>


                    <View>
                        <View style={{flexDirection:"row", borderWidth:1,borderColor:'#B9BBBF'}}>
                            <Text style={{color:'#ff5114',fontSize:16,padding:10,
                                width:ScreenWidth*0.85}}>已报名志愿者</Text>
                            <Text style={{color:'#ff5114',paddingTop:10}}>0</Text>
                            <Text style={{paddingTop:10,paddingRight:10}}>/10</Text>
                        </View>
                        <View style={{height:80}}>
                            <Image source={require('../../../../image/personal_no_portrait.png')}
                                   style={{width:50,height:50,margin:10}}/>
                        </View>
                    </View>

                </ScrollView>
                {ViewUtils.getDetailBottom(()=>{this.share()},()=>{this.signUp()},()=>{this.attention()},this.state.attention)}

            </View>

        );
    }
    titleView(){

        if (this.props.detailsData.Type==0){
            return <Text style={styles.titleStyle}>活动</Text>

        }else {
            return <Text style={styles.titleStyle}>岗位</Text>
        }

    }


    /***
     * 判断图片是中国年的文字是岗位还是活动
     * @param type
     * @returns {*}
     */
    listType(type) {
        if (type===0){
            return "活动"
        }else {
            return "岗位"
        }
    }
    /****
     * 返回到上一个页面
     */
    back(){
        this.props.navigator.pop();
    }

    /***
     * 跳转到搜索界面
     */
    search(){
        this.props.navigator.push({
            component:SearchPage

        })
    }

    /***
     * 分享
     */
    share(){

    }

    /***
     * 报名
     */
    signUp(){


    }

    /***
     * 关注
     */
    attention(){
        let value=this.props.detailsData;
        let keyValue=JSON.stringify(value);
        if(this.state.attention==='关注'){
            /***
             * 将数据添加到数据库中
             */

            storage.save({key:keyName,rawData:keyValue});
            console.log('keyValue'+keyValue);

            this.setState({
                attention:'已关注'
            });
        }else {
            /****
             * 将数据从数据库中删除
             */
            storage.remove({key:keyName,id:this.props.detailsData.id})
            ;
            this.setState({
                attention:'关注'
            })

        }

    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent:'space-between',
        height:Platform.OS=='ios'?64:60,//如果系统是iOS高度就是64不是iOS高度就是60

        flexDirection:'row'
    },

    titleStyle:{
        color:'white',
        fontSize:18,
        marginTop:Platform.OS=='ios'?20:10
    },

    //详情页面下的3个按钮
    bottomTextStyles:{
        fontSize:18,
        textAlign:'center',
        width:ScreenWidth/3,
        height:50,
        color:'black',
        borderWidth:0.3,
        paddingTop:14
    }
});

// 输出组件类
