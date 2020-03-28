import React, { Component } from 'react'
import {View,Image,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon } from '@ant-design/react-native';
import Button from 'react-native-button';
const styles = StyleSheet.create({
  searchbox: {
    flexDirection:'row',
    flexWrap:'wrap',
    padding:10,
    backgroundColor: '#fff'
  },
  tabbox: {
    width:'20%',
    height:40,
    margin:0,
    backgroundColor:'#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  tabword: {
    textAlign: "center",
    lineHeight: 35,
    fontSize: 17,
    color: '#333'
  },
  out: {
    justifyContent:'space-evenly',
    flexWrap:'wrap'
  },
  box:{
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    marginTop:10,
    flexDirection:'row'
  },
  img: {
    marginTop: 3,
    marginLeft: 30,
    
  },
  word1: {
    fontSize: 22,
    color: '#333333',
    marginLeft: 35,
    lineHeight:80
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 350,
    height: 60,
    backgroundColor: '#f23030',
    color: '#fff',
    lineHeight: 60,
    borderRadius: 12,
    fontSize: 22
  },
  box1: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center'
  },
  word2: {
    marginTop: 40,
    color: '#767676'
  }
});
export default class All extends Component {
    render() {
        return (
          <ScrollView>            
            <View style={[styles.searchbox,{backgroundColor:'#f23030'}]}>
              <View style={{width:'85%'}}>
                <TextInput
                  placeholder='          请输入您要搜索的关键字'
                  placeholderTextColor='#fff'
                  style={{
                    backgroundColor:'#fbb8b8',
                    height:40,
                    borderRadius: 20
                  }}
                />
              </View>
              <Icon name="search" color='white' size='sm' style={{position:'absolute',left:'6%',top:20}} />
              <Icon name="shopping-cart" color='white' size='lg' style={{position:'absolute',right:'5%',top:13}} />
            </View>     
            <View style={{height:200,width:'100%'}}>
              <Swiper
                dot={<View style={{           //未选中的圆点样式
                  backgroundColor: '#fff',
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  marginLeft: 10
                
                }}/>}
                activeDot={<View style={{    //选中的圆点样式
                  backgroundColor: '#fd0304',
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  marginLeft: 10
                }}/>}
                autoplay={true} 
                paginationStyle={{bottom: 10}}
              >
                <Image style={{width:'100%'}} source={require('../assets/5.png')}/>
                <Image style={{width:'100%'}} source={require('../assets/6.png')}/>
                <Image style={{width:'100%'}} source={require('../assets/5.png')}/>               
              </Swiper> 
            </View>
            <View style={styles.out}>
              <View style={styles.box}>
                <Image style={styles.img} source={require('../assets/7.png')}/>
                <Text style={styles.word1}>居家维修保养</Text>
              </View>
              <View style={styles.box}>
                <Image style={styles.img} source={require('../assets/8.png')}/>
                <Text style={styles.word1}>住宿优惠</Text>
              </View>
              <View style={styles.box}>
                <Image style={styles.img} source={require('../assets/9.png')}/>
                <Text style={styles.word1}>出游接送</Text>
              </View>
              <View style={styles.box}>
                <Image style={styles.img} source={require('../assets/10.png')}/>
                <Text style={[styles.word1,{color:'#f23030'}]}>E族活动</Text>
              </View>
           </View> 
            <View style={styles.box1}>
              <Button style={styles.btn}>发布需求</Button>
              <Text style={styles.word2}>©E族之家 版权所有</Text>
            </View>
          </ScrollView>
        )
    }
}
