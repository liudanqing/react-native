import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

const goods = [
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img: require('../assets/3.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img: require('../assets/4.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img: require('../assets/3.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img: require('../assets/4.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img: require('../assets/3.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img: require('../assets/4.png')
    },
]

export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            tits: []
        }
    }
    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                            placeholder="请输入名称"
                            placeholderTextColor='#767676'
                            style={{
                                width: 490*s,height: 50*s,
                                padding: 0,
                                paddingLeft: 10
                            }}
                        />
                        <Icon name='search' />
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={styles.word1}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>信用</Text>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:180*s,marginTop: 60*s}}
                            />
                            <Text
                                style={{marginTop: 20}}
                            
                            >{item.title}</Text>
                            <Text 
                                style={{width:'100%',color: 'red'}}
                            >{item.price}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    word1:{
        color: '#f23030'
    },
    header:{
        height: 70*s,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1/3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search:{
        width: 544*s,
        height: 50*s,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nav:{
        height: 73*s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    good:{
        width: 290*s,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        alignItems: 'center'
    }
})