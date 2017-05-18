/**
 * Created by nbcei on 2017/3/24.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Navigator,
    BackAndroid,
    ToastAndroid
} from 'react-native';
import HomePage from './home/HomaPage';
import FindPage from './find/FindPage';
import SignPage from './sign/SignPage';
import MinePage from './mine/MinePage';
import TabNavigator from 'react-native-tab-navigator';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'//默认是第一个
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.LONG);
        return true;
    };

    render() {
        return (
            <View style={styles.container}>

                <TabNavigator>
                    <TabNavigator.Item
                        title="首页" // 传递变量一定要加大括号
                        renderIcon={() => <Image source={require('./../../image/home_unselect.png')} style={styles.iconStyle} />}//图标
                        renderSelectedIcon={() => <Image source={require('./../../image/home_select.png')} style={styles.iconStyle} />}//选中的图标
                        onPress={() => this.setState({ selectedTab:'home' })}
                        selected={this.state.selectedTab ==='home'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                    >
                        <HomePage {...this.props}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        title="发现" // 传递变量一定要加大括号
                        renderIcon={() => <Image source={require('../../image/find_unselect.png')} style={styles.iconStyle} />}//图标
                        renderSelectedIcon={() => <Image source={require('../../image/find_select.png')} style={styles.iconStyle} />}//选中的图标
                        onPress={() => this.setState({ selectedTab:'find' })}
                        selected={this.state.selectedTab ==='find'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                    >

                       <FindPage {...this.props}/>
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        title="签到" // 传递变量一定要加大括号
                        renderIcon={() => <Image source={require('../../image/sign_in_unselect.png')} style={styles.iconStyle} />}//图标
                        renderSelectedIcon={() => <Image source={require('../../image/sign_in_select.png')} style={styles.iconStyle} />}//选中的图标
                        onPress={() => this.setState({ selectedTab:'sign' })}
                        selected={this.state.selectedTab ==='sign'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                    >
                        <SignPage {...this.props}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        title="我的" // 传递变量一定要加大括号
                        renderIcon={() => <Image source={require('../../image/mine_unselect.png')} style={styles.iconStyle} />}//图标
                        renderSelectedIcon={() => <Image source={require('../../image/mine_select.png')} style={styles.iconStyle} />}//选中的图标
                        onPress={() => this.setState({ selectedTab:'mine' })}
                        selected={this.state.selectedTab ==='mine'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                    >
                        <MinePage {...this.props}/>
                    </TabNavigator.Item>

                </TabNavigator>
            </View>)
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    },
    iconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    },
    selectedTitleStyle: {
        color: '#00b3b3'
    }
});