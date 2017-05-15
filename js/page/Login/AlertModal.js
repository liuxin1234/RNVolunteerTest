/**
 * Created by Administrator on 2017/3/27.
 *  自定义弹窗
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
    Navigator
} from 'react-native';
import RegisterPage from './../home/RegisterVolunteer';
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class AlertModal extends Component{
    constructor(props){
        super(props);
        this.state = { visible: false };
    }
    close=()=>{
        this.setState({ visible: false });
    };
    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible });
    }
    renderContent=()=>{
        return ( <View style={[styles.background,{width: ScreenWidth * 0.7, height: ScreenHeight * 0.3}]}>
            <Text style={{fontSize:22, color:'#00b3b3', marginTop:20,textAlign:'center',}}>请选择</Text>

            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.jumpNewPage()}}>
                <Text style={{fontSize:20, margin:10,backgroundColor:'#00b3b3',color:'white',
                        textAlign:'center',
                        padding:10,
                        width:ScreenWidth * 0.6,
                        borderRadius:8
                        }}>注册志愿者</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.jumpNewPage()}}>
                <Text style={{fontSize:20, color:'white',margin:10,backgroundColor:'#00b3b3',
                        textAlign:'center',
                        padding:10,
                        width:ScreenWidth * 0.6,
                        borderRadius:8
                        }}>注册专业志愿者</Text>
            </TouchableOpacity>
        </View>)
    };
    render(){
        return(
            <Modal
                animationType='slide'//进场动画 fade
                onRequestClose={() => this.close()}
                visible={this.state.visible}//是否可见
                transparent={true} //背景透明
            >
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this.close}//点击灰色区域消失
                >
                    <View style={styles.container}>
                        {this.renderContent()}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    /**
     * 跳转到注册界面
     */
    jumpNewPage() {
        this.props.onClose();//告诉上一个页面弹窗已经关闭了
        this.props.navigator.push({
            component: RegisterPage,
            params: {
                isBack:true
            }
        });
    }

}
const styles = StyleSheet.create({
    container:{
        //设置透明度
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent:'center',
        alignItems:'center'
    },
    background: {
        //设置内部组件的布局
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

