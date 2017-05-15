/**
 * Created by Administrator on 2017/3/27.
 *  自定义弹窗  下拉列表
 */

import React, { Component ,PropTypes} from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions,
    Image,
    Modal,
    TextInput,
    InteractionManager,
    Navigator,
    ListView,
    AsyncStorage
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const KEY='type';
export default class DropStateModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            listData:[],
            name:''
        };
        this.dataSource =new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
    }
    close=()=>{
        this.props.onClose();
    };

    /**
     * react组件生命周期里面的一个时间节点的回调函数。通常在组件接收新的props时触发
     * @param props
     */
    componentWillReceiveProps(props) {
        this.setState({
            visible: props.visible,
            listData: props.dropListStateData
        });
    }
    renderContent=()=>{
        return (
            <View style={styles.background}>
                <ListView
                    dataSource={this.dataSource.cloneWithRows(this.state.listData)}
                    enableEmptySections={true}
                    renderRow={(data)=>this.renderRow(data)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                />
            </View>
        )
    };
    render(){
        return(
            <Modal
                animationType='none'//进场动画 fade
                onRequestClose={() => this.close()}
                visible={this.state.visible}//是否可见
                transparent={true} //背景透明
            >
                <TouchableOpacity style={{flex:1}} activeOpacity={0.5} onPress={this.close}//点击灰色区域消失
                >
                    <View style={styles.container}>
                        {this.renderContent()}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    /**设置每个条目之间的分割线**/
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={{borderBottomWidth:1}}/>
    }

    /**ListView的item的布局**/
    renderRow(data){
        console.log("类型的data："+JSON.stringify(data));
        let name=data.Name;
        return  (
            <View style={{width:ScreenWidth}}>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.onSelect(data)}}>
                    <Text style={{fontSize:16,textAlign:'center',padding:10}}>{name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onSelect(item){
        this.props.onClose();
        this.props.callback(item);
    }

}
const styles = StyleSheet.create({
    container:{
        //设置透明度
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        position: 'absolute',
        top: Platform.OS==="ios"?95:90,
        bottom: 50,
        left: 0,
        right: 0,

        alignItems:'center',

    },
    background: {
        //设置内部组件的布局
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

