import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text, Image, BackHandler,ToastAndroid, AsyncStorage } from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import All from './components/All';
import Test from './components/Test';
import User from './components/User';
import Publish from './components/Publish';
import Register from './src/common/Register';
console.disableYellowBox = true;

const App = () => {
	let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			if(res){
				setInstall(false);
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
	}
	useEffect(()=>{
		init();
	},[])
	let afterInstall = ()=>{
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}

	return (
		<Router
			backAndroidHandler={()=>{
				if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}				
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>  
				<Lightbox key="lightbox">
					<Drawer 
						key="drawer"
						contentComponent={()=><Text>这是刘丹青的APP</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					>
						<Scene key='root'>
							<Tabs
								key='tabbar'
								hideNavBar
								activeTintColor='#f23030'
								inactiveTintColor='#979797'
								tabBarStyle={{backgroundColor:'#fff'}}
							>
								<Scene key='home'
									title='主页'
									hideNavBar
									icon={({focused})=><Icon color={focused?'#f23030':'#979797'} name="home"/>}
									component={All}
								/>
								<Scene key='all'
									title='商品分类'
									hideNavBar
									icon={({focused})=><Icon color={focused?'#f23030':'#979797'} name="appstore"/>}
									component={Test}
								/>
								<Scene key='user'
									title='个人中心'
									hideNavBar
									icon={({focused})=><Icon color={focused?'#f23030':'#979797'} name="user"/>}
									component={User}
								/>
							</Tabs>
							<Scene 
								key='public' 
								title='我的发布' 
								navigationBarStyle={{backgroundColor:'#f23030'}} 
								titleStyle={{color:'#fff',flex:1,textAlign:'center'}}
								navBarButtonColor='#fff'
								component={Publish}
								renderRightButton={<Icon color='#fff' size='lg' style={{marginRight:15}} name="ellipsis"/>}
							/> 
						</Scene>  
					</Drawer>
				</Lightbox>
                <Scene key='login' initial={!isLogin} component={Login}/>
				<Scene key='register' component={Register}/>
            </Modal>
			</Overlay>
		</Router>
	);
};

export default App;