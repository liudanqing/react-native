import React, {Component} from 'react';
import {View, Text, TextInput, AsyncStorage, TouchableOpacity, ToastAndroid, BackHandler, Animated, Alert, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';
import { WebView } from 'react-native-webview';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      pwd:'',
      isloading:false
    }
  }
  userhandle = (text) => {
    this.setState({username:text})
  }
  pwdhandle = (text) => {
    this.setState({pwd:text})
  }
  login = () => {
    this.setState({isloading:true})
    myFetch.post('/login',{
      username:this.state.username,
      pwd:this.state.pwd
    }).then(res => {
      AsyncStorage.setItem('user',JSON.stringify(res.data))
        .then(()=> {
          if(res.data.tip == '1') {
            Alert.alert('用户名不能为1111')            
            console.log(res.data)
          } else if (res.data.tip == '0') {
            Alert.alert('用户名不能为空')
          } else {
            this.setState({isloading:false})
            Actions.home();            
          } 
          this.setState({isloading:false})
        })
    })
  }

  render() {
    let now = 0;
    BackHandler.addEventListener('hardwareBackPress', () => {
      let time = Date.now()
      if (time - now <= 2000) {
          BackHandler.exitApp()
          return false
      } else {
          ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
          now = time
          return true
      }
  })
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
              onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="密码"
              secureTextEntry={true} 
              onChangeText={this.pwdhandle}
            />
          </View>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>
            <Text style={{color:'#666',marginTop:10}} onPress={Actions.register}>未注册？点此注册</Text>
        </View>
        {
          this.state.isloading? 
            <View style={styles.containter}>
              <Animated.View style={[styles.innerBox,{opacity:this.state.opacity}]}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:20}}>登录中，请稍等</Text></View>
              </Animated.View>
            </View>
          :null
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containter: {
      backgroundColor: 'rgba(50,50,50,0.5)',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: "center"
  },
  innerBox: {
      width: '80%',
      height: "50%",
      justifyContent: 'center',
      alignItems: "center"
  }
})