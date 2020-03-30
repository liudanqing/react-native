import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
          username:'',
          pwd:''
        }
      }
      userhandle = (text) => {
        this.setState({username:text})
      }
      pwdhandle = (text) => {
        this.setState({pwd:text})
      }
      register = () => {
        myFetch.post('./login',{
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
                Actions.login();
              }              
            })
        })
      }
    render() {
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
                    onPress={this.register}>
                    <Text>注册</Text>
                </TouchableOpacity>
                <Text style={{color:'#666',marginTop:10}} onPress={Actions.login}>点此登录</Text>
            </View>
          </View>
        )
    }
}
