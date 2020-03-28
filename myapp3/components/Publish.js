import React, { Component } from 'react'
import { Text, View, StyleSheet, ToastAndroid, ScrollView } from 'react-native'
import Button from 'react-native-button'

const styles = StyleSheet.create({
    box: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        marginTop: 40,
        alignItems: 'center'
    },
    word1: {
        fontSize: 15,
        marginTop: 15,
        color: '#555'
    },
    btn: {
        width: 120,
        height: 35,
        backgroundColor: '#f23030',
        color: 'white',
        borderRadius: 15,
        lineHeight: 35
    }
})
export default class Publish extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        }
        this.page = 1;
    }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?page=1&limit=15')
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    data: res.data
                });
            })
    }
    pageUp = () => {
        if(this.page == 1) {
            this.page = 1;
            ToastAndroid.show('已经是第一页了！', ToastAndroid.SHORT)
        } else {
            this.page = this.page - 1;
        }
        fetch('https://cnodejs.org/api/v1/topics?page='+this.page+'&limit=15')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data: res.data
            });
        })
    }
    pageDown = () => {
        this.page = this.page + 1;
        fetch('https://cnodejs.org/api/v1/topics?page='+this.page+'&limit=15')
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    data: res.data
                });
            })
    }
    render() {
        var color = '';
        return (
            <ScrollView>
                <View>
                    {
                        this.state.data.map((item) => {
                            if(item.title.length > 15) {
                                item.title = item.title.slice(0,15) + '...'
                            }
                            if(item.reply_count > 0) {
                                item.reply_count = '已回复';
                                color = '#f23030'
                            } else {
                                item.reply_count = '待回复';
                                color = '#555'
                            }
                            return <View>
                                <Text style={[styles.word1,{left:10}]}>{item.title}</Text>
                                <Text style={[styles.word1,{position:'absolute',right:80}]}>{item.create_at.slice(0,10)}</Text>
                                <Text style={[styles.word1,{position:'absolute',right:10,color:color}]}>{item.reply_count}</Text>
                            </View>
                        })                    
                    }
                    <View style={styles.box}>
                        <Button style={styles.btn} onPress={this.pageUp}>上一页</Button>
                        <Text>第{this.page}页</Text>
                        <Button style={styles.btn} onPress={this.pageDown}>下一页</Button>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
