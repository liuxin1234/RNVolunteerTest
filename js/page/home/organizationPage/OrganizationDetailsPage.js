/**
 * Created by nbcei on 2017/3/29.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView,

} from 'react-native';
import NetUtils from '../../utils/netUtils'
var Dimensions = require('Dimensions');
import Search from'../../../common/SearchPage'

const ScreenWidth = Dimensions.get('window').width;
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ViewUtils from'../../utils/ViewUtils'
export default class OrganizationDetailsPage extends Component {
    constructor(props) {
        super(props);
        /**第二部**/
        this.state = {
            listData: [],
            isLoading: true,
        };
    }

    render() {
        let data=this.props.orgDateilData;
        console.log(data);
        return (
            <View style={{flex:1,backgroundColor:'white'}}>

                {ViewUtils.getSecondToolBar(() => {
                    this.back()
                }, '组织', require('../../../../image/magnifier.png'), () => {
                    this.search()
                })}
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#23B39A'}}>
                    <Text
                        style={{fontSize:20,marginTop:40,color:'white'}}>{this.props.orgDateilData.OrganizationName}</Text>
                    <Text
                        style={{fontSize:16,marginBottom:40,marginTop:20,color:'white'}}>{this.props.orgDateilData.Addr}</Text>
                </View>
           <ScrollableTabView>
                    <Organization_Introduction tabLabel="组织介绍" address={this.props.orgDateilData.Addr}
                                               person={this.props.orgDateilData.Person}
                                               tel={this.props.orgDateilData.Tel}
                                               registerTiem={this.props.orgDateilData.RegisterTime}
                                               Service={this.props.orgDateilData.CompanyName}

                    />
                    <Job_Activity tabLabel="已发布岗位活动"/>
                </ScrollableTabView>
            </View>
        );
    }


    /****
     * 返回到上一个页面
     */
    back() {
        this.props.navigator.pop();
    }

    search() {
        this.props.navigator.push({
            component:Search

        })
    }
}
class Job_Activity extends Component {


    render() {
        return (
            <View style={{flexDirection:'row'}}>
                <Text style={{flex: 1,textAlign:'center' ,}}>招聘中</Text>
                <Text style={{flex: 1,textAlign:'center' ,}}>开展中</Text>
                <Text style={{flex: 1,textAlign:'center', }}>已结束</Text>
                <Text style={{flex: 1,textAlign:'center', }}>全部</Text>

            </View>


        )

    }
}

class Organization_Introduction extends Component {


    render() {
        return (
            <View>
                <ScrollView>
                    {ViewUtils.getDetailItem('单位地址',this.props.address)}
                    {ViewUtils.getDetailItem('单位地址',this.props.name)}
                    {ViewUtils.getDetailItem('联系人',this.props.person)}
                    {ViewUtils.getDetailItem('联系电话',this.props.tel)}
                    {ViewUtils.getDetailItem('组织荣誉','')}
                    {ViewUtils.getDetailItem('注册时间',this.props.registerTiem)}
                    {ViewUtils.getDetailItem('服务领域',this.props.Service)}
                </ScrollView>

            </View>
          )

    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? 64 : 44,//如果系统是iOS高度就是64不是iOS高度就是44
        flexDirection: 'row'
    },


});

// 输出组件类
