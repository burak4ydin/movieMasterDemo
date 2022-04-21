import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import 'react-native-gesture-handler';
//Screens


import App from '../App'
import MainTabNav from "./Navs/MainNav";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {getCats, getMovies} from "./redux/actions/movieAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Likes from "./screens/Likes";
import Detail from "./screens/Detail";
import Search from "./screens/Search";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();





const mainNavTab=()=>{
    // <MainTabNav navigation={props.navigation} route={props.route}/>

    return(
            <Tab.Navigator tabBar={props =>  <MainTabNav  {...props}/>}>
                <Tab.Screen name ='Home' component={App} options={{headerShown:false}}/>
                <Tab.Screen name ='Search' component={Search} options={{headerShown:false}}/>
                <Tab.Screen name ='Likes' component={Likes} options={{headerShown:false}}/>

            </Tab.Navigator>
    )

}



const Main = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={mainNavTab} options={{headerShown:false}}  />
                <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}}  />

            </Stack.Navigator>
        </NavigationContainer>

    )
}







export default Main




