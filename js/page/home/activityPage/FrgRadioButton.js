/**
 * Created by Administrator on 2017/5/12.
 *
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

export default class FrgRadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            isNotDealSelected: true,
            isDealedSelected: false,
            selectInt:''
        }
    }

    /**
     * react组件生命周期里面的一个时间节点的回调函数。通常在组件接收新的props时触发
     * @param props
     */
    componentWillReceiveProps(props) {
        this.setState({
            selectInt: props.selectInt
        });
        console.log("selectInt: "+props.selectInt);
        if (props.selectInt === 0){
            this.setState({
                isSelected: false,
                isNotDealSelected:true

            })
        }else {
            this.setState({
                isSelected: true,
                isNotDealSelected:false
            })
        }
    }

    // 更新"全部/未处理/已处理"按钮的状态
    _updateBtnSelectedState(currentPressed, array, int) {
        if (currentPressed === null || currentPressed === 'undefined' || array === null || array === 'undefined') {
            return;
        }

        let newState = {...this.state};

        for (let type of array) {
            if (currentPressed == type) {
                newState[type] ? {} : newState[type] = !newState[type];
                this.setState(newState);
            } else {
                newState[type] ? newState[type] = !newState[type] : {};
                this.setState(newState);
            }
        }

        this.props.callback(int);
    }

    // 返回设置的button
    _getButton(style, selectedSate, stateType, buttonTitle, int) {
        let BTN_SELECTED_STATE_ARRAY = ['isSelected', 'isNotDealSelected'];
        return(
            <View style={[style, selectedSate ? {backgroundColor: '#008484'} : {backgroundColor: 'white'}]}>
                <Text
                    style={[styles.button, selectedSate ? {color: 'white'} : {color:'#00b3b3'}]}
                    onPress={ () => {this._updateBtnSelectedState(stateType, BTN_SELECTED_STATE_ARRAY,int)}}>
                    {buttonTitle}
                </Text>
            </View>
        );
    }

    render(){

        return(
            <View style={styles.buttonlayout}>
                {this._getButton(styles.buttonleft, this.state.isSelected, 'isSelected', '岗位',1)}
                <View style={styles.buttondivideline}/>
                {this._getButton(styles.buttonright, this.state.isNotDealSelected, 'isNotDealSelected', '活动',0)}
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    exit: {
        width: 380,
        height: 50,
        marginTop: 30,
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    },
    exittext: {
        height: 50,
        fontSize: 18,
        textAlignVertical: 'center',
    },
    buttonlayout: {
        height: 30,
        marginTop: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#00b3b3',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 4,
    },
    buttonleft: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    buttonright: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    button: {
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttondivideline: {
        width: 1,
        height: 30,
        backgroundColor: '#00b3b3',
        flexDirection: 'column',
    },
});