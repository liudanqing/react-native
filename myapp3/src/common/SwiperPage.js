import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {
  start = () => {
    AsyncStorage.setItem('isInstall','true',() => {
        console.log('store end')
    });
    this.props.afterInstall();
  };
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../assets/nav1.jpg')}
          />
        </View>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../assets/nav3.jpg')}
          />
        </View>
        <View style={styles.slide1} >
          <Image
            style={styles.img}
            source={require('../../assets/nav2.jpg')}
          />
          <TouchableOpacity style={styles.start}  onPress={this.start}>
            <Text style={{color: '#fff'}}>开始体验</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  slide1: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  start: {
    position: 'absolute',
    bottom: 150,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f23030',
    borderRadius: 20,
  },
});