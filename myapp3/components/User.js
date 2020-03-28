import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button'
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs';
// const fs = require("fs");
const styles = StyleSheet.create({
    box1: {
        backgroundColor: '#f23030',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    word1: {
        fontSize: 25,
        marginTop: 30,
        color: '#fff'
    },
    box2: {
        flexDirection:'row',
        backgroundColor:'#fff',
        padding: 10,
        marginTop: 8,
        marginBottom: 1,
        paddingLeft: 25
    },
    box3: {
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor: '#fff',
        paddingBottom: 30
    },
    good:{
        width: '33.3%',
        backgroundColor: '#fff',
        marginTop: 18,
        alignItems: 'center'
    },
    word2: {
        marginTop: 8,
        marginLeft: 10
    },
    box4: {
        alignItems: 'center',
        height: 50
    }
})
const goods = [
    {
        title: '账户管理',
        name: 'setting'
    },
    {
        title: '收货地址',
        name: 'environment'
    },
    {
        title: '我的信息',
        name: 'solution'
    },
    {
        title: '我的订单',
        name: 'file'
    },
    {
        title: '我的二维码',
        name: 'qrcode'
    },
    {
        title: '我的积分',
        name: 'pound'
    },
    {
        title: '我的收藏',
        name: 'star'
    }
]
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class User extends Component {
    constructor() {
        super();
        this.state = {
            avatarSource:require('../assets/user.png')
        }
    }
    componentDidMount() {
        var that = this;
        AsyncStorage.getItem('path',function(error,result) {
            if(error) {
            } else {
                if(!result) {}
                else {
                    that.setState({
                        avatarSource:JSON.parse(result)
                    })
                }
            }
        })
    }
    changePhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                var source = { uri: response.uri };
                console.log("source")
                console.log(source)
                this.setState({
                    avatarSource: source,
                });
                source = JSON.stringify(source)
                AsyncStorage.setItem('path',source,
                () => {console.log('store success')})
            }
        });
    }
    out = () => {
        AsyncStorage.clear();
        Actions.login();
    }
    render() {
        return (
        <>
            <ScrollView>
                <View style={styles.box1}>
                    <Button onPress={this.changePhoto}><Image source={this.state.avatarSource} style={{width:150,height:150,borderRadius:75}}/></Button>
                    <Text style={styles.word1}>BINNU DHILLON</Text>
                </View>
                <View style={styles.box2}>
                    <Image source={require('../assets/11.png')}/>
                    <Text style={styles.word2}>我的个人中心</Text>
                </View>
                <View style={styles.box3}>
                    {
                        goods.map((item)=>(
                            <View style={styles.good}>
                                <Icon size='lg' name={item.name}/>
                                <Text style={{marginTop: 10,color:'#4f4f4f'}}
                                >{item.title}</Text>
                            </View>)
                    )}
                </View>
                <View style={styles.box2}>
                    <Icon size='lg' name='tag'/>
                    <Text style={styles.word2}>E族活动</Text>
                </View>
                <View style={styles.box3}>
                    <View style={styles.good}>
                        <Icon size='lg' name='tool'/>
                        <Text style={{marginTop: 10,color:'#4f4f4f'}}
                        >居家维修保养</Text>
                    </View>
                    <View style={styles.good}>
                        <Icon size='lg' name='car'/>
                        <Text style={{marginTop: 10,color:'#4f4f4f'}}
                        >出行接送</Text>
                    </View>
                    <View style={styles.good}>
                        <Icon size='lg' name='user'/>
                        <Text style={{marginTop: 10,color:'#4f4f4f'}}
                        >我的受赠人</Text>
                    </View>
                    <View style={styles.good}>
                        <Icon size='lg' name='home'/>
                        <Text style={{marginTop: 10,color:'#4f4f4f'}}
                        >我的住宿优惠</Text>
                    </View>
                    <View style={styles.good}>
                        <Icon size='lg' name='flag'/>
                        <Text style={{marginTop: 10,color:'#4f4f4f'}}
                        >我的活动</Text>
                    </View>
                    <View style={styles.good}>
                        <Button onPress={()=>Actions.public()}>
                            <Icon size='lg' name='form'/>
                        </Button>
                        <Button onPress={()=>Actions.public()}>
                            <Text style={{marginTop: 10,color:'#4f4f4f'}}
                            >我的发布</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.box4}>
                    <Button onPress={this.out}><Text style={{lineHeight:50,color: '#767676',fontSize: 15}}>BINNU DHILLON | 退出</Text></Button>
                </View>
            </ScrollView>
        </>
        )
    }
}
