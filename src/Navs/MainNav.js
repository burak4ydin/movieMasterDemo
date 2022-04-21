import React, { Component, useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Dimensions, Platform, useWindowDimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ProgressBar, {
    Container,
    Content,
    Body,
    Button,
    Text,
    Header,
    Input,
    Footer,
    FooterTab,
    InputGroup,
    Icon,
    Thumbnail,
    ListItem,
    List,
    Grid,
    Row,
    } from 'native-base'
    const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MainTabNav= ({navigation,state,route}) =>{
    const[focus,setFocus] = useState('');
    const [xwidth,setxWidth] =useState(windowWidth);
    const [xheight,setxHeight] =useState(windowHeight)
    useEffect(() => {


        // setFocus(`${routes.name}`)
        Dimensions.addEventListener('change',()=>{
            setxWidth(Dimensions.get("screen").width);
            setxHeight(Dimensions.get("screen").height);
        })
        const {index}=state;
        const current= state.routes[index].name;
        setFocus(`${current}`)
    }, [])
    let changePage=(which)=>{
        setFocus(which);
        navigation.navigate(which)

    }


    return (
        <SafeAreaView style={[styles.container,{height:xheight<xwidth?xheight/10:xheight/17}]}>
            <View style={styles.grid}>
                <View style={[styles.topRow,{width:xwidth}]}>
                    <View style={[styles.menuLabels,{width:xwidth-100,marginTop:xheight<xwidth?-5:5}]}>
                        <View style={styles.menuLabel }>
                            <TouchableOpacity onPress={()=>changePage('Home')}>
                                <View style={focus=='Home' ? [styles.activeMenuButton,
                                    {
                                        width:xheight<xwidth?
                                          wp(10)
                                          :
                                          wp(13),
                                        height:xheight<xwidth?
                                          wp(10)
                                          :
                                          wp(13)}]
                                  :
                                  styles.menuButton
                                       }>
                                    {focus=='Home' ? <Icon name='planet' color={'white'} style={[styles.activeMenuIcon,{fontSize:xheight>xwidth?wp('6%'):wp('4')}]}/> : <Icon name='planet-outline' color={'white'} style={[styles.menuIcon,{        fontSize:xheight<xwidth ? wp(5):wp(6) }]}/>}
                                </View>

                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuLabel }>
                            <TouchableOpacity onPress={()=>changePage('Search')}>
                                <View style={focus=='Search' ? [styles.activeMenuButton,
                                      {
                                          width:xheight<xwidth?
                                            wp(10)
                                            :
                                            wp(13),
                                          height:xheight<xwidth?
                                            wp(10)
                                            :
                                            wp(13)}]
                                  :
                                  styles.menuButton
                                }>
                                    {focus=='Activity' ? <Icon name='search' color={'white'} style={[styles.activeMenuIcon,{fontSize:xheight>xwidth?wp('6%'):wp('4')}]}/> : <Icon name='search-outline' color={'white'} style={[styles.menuIcon,{        fontSize:xheight<xwidth ? wp(5):wp(6) }]}/>}
                                </View>

                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuLabel }>
                            <TouchableOpacity onPress={()=>changePage('Likes')}>
                                <View style={focus=='Likes' ? [styles.activeMenuButton,
                                      {
                                          width:xheight<xwidth?
                                            wp(10)
                                            :
                                            wp(13),
                                          height:xheight<xwidth?
                                            wp(10)
                                            :
                                            wp(13)}]
                                  :
                                  styles.menuButton
                                }>
                                    {focus=='Likes' ? <Icon name='list' color={'white'} style={[styles.activeMenuIcon,{fontSize:xheight>xwidth?wp('6%'):wp('4')}]}/> : <Icon name='list-outline' color={'white'} style={[styles.menuIcon,{        fontSize:xheight<xwidth ? wp(5):wp(6) }]}/>}
                                </View>

                            </TouchableOpacity>
                        </View>



                    </View>

                </View>
                <View style={styles.bottomRow}>

                </View>
            </View>



        </SafeAreaView>
    )
}

export default MainTabNav;
const styles = StyleSheet.create({
    container:{

        borderTopWidth:0,
        backgroundColor:'white',

    },
    grid:{
        height:70,
        flex:5,
        backgroundColor:'transparent',
        position:'relative',
        opacity:1,
    },
    topRow:{
        // flex:3,
        backgroundColor:'transparent',
        top:0,
        position:'absolute',
        zIndex:1,
        alignItems:'center'
    },
    bottomRow:{
        flex:2,
        position:'absolute',
        bottom:0,
        height:60,
        backgroundColor:'white',
        borderTopEndRadius:25,
        borderTopStartRadius:25,
        borderTopWidth:2,
        borderColor:'#F7F7F8'

    },
    menuLabels:{

        marginTop:-3,
        flexDirection:'row',
        justifyContent:'space-around',
        marginHorizontal:10,
    },
    menuLabel:{
        width:wp('20%'),
        height:wp('7%'),
        marginHorizontal:10,

        alignItems:'center',
        justifyContent:'flex-end'
    },

    menuIcon:{
        fontSize:wp('6'),
        color:'#B5BABD'

    },
    menuButton:{


    },
    activeMenuButton:{
        backgroundColor:'#9141E0',
        borderRadius:7,


        padding:10,
        justifyContent:'center',
        // transform: [
        //     {
        //         rotate: '3deg',
        //         },
        //         {
        //         translateY: -5,
        //         },
        //     ],

    },
    activeMenuIcon:{

        color:'#FFFFFF',

        textAlign:'center',
        backgroundColor:'#9141E0'
    },


})
