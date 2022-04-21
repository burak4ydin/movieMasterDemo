import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {getCats, getMovies, getLikes, updateLikes} from "../../redux/actions/movieAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Icon, Title,Content} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

const Detail =(props)=>{
    const [liked,setLiked]=useState(false)

    useEffect(()=>{
         // alert(JSON.stringify(route.params.item))
        if(props.likes.length>0){
            props.likes.find(item=>{
                if(item.name==props.route.params.item.name){
                    setLiked(true)
                }
            })
        }

    },[setLiked])
    let {navigation,route}=props
    let item = route.params.item

    return(
        <View style={{backgroundColor:'blue',flex:1,alignItems:'center'}}>

            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }} style={{position:'absolute',top:50,left:30}}>
                <Icon name={'chevron-back-outline'} style={{color:'white'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                let oldList=props.likes
                const {actions} = props
                if(liked){
                    oldList.find((value,index)=>{
                        if(value.name==item.name){
                            oldList.splice(index,1)
                            actions.updateLikes(oldList)
                            AsyncStorage.setItem('likes',(JSON.stringify(oldList)))
                            setLiked(false)
                        }
                    })
                }else{
                    oldList.push(item)
                    actions.updateLikes(oldList)
                    AsyncStorage.setItem('likes',(JSON.stringify(oldList)))
                    setLiked(true)
                }
            }} style={{position:'absolute',top:50,right:30}}>
                <Icon name={liked? 'heart':'heart-outline'} style={{color:'white'}}/>
            </TouchableOpacity>
            <View style={{width:'80%',height:'50%',backgroundColor:'white',marginTop:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                <Title style={{color:'blue'}}>{item.name[0].toUpperCase()}</Title>
            </View>
            <View style={{width:'100%',alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingHorizontal:10,marginVertical:20,alignItems:'center'}}>
                    <Title style={{color:'white'}}>Name:</Title>
                    <Text style={{color:'white'}}>{item.name}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingHorizontal:10,marginVertical:20,alignItems:'center'}}>
                    <Title style={{color:'white'}}>Watch:</Title>
                    <Text style={{color:'white'}}>{item.item_count}</Text>
                </View>
                {item.description.length >0 && (

                    <View style={{width:'80%',height:50,paddingHorizontal:10,marginVertical:20,alignItems:'center'}}>
                        <Title style={{color:'white'}}>Description:</Title>
                        <Text style={{color:'white'}}>{item.description}</Text>
                    </View>

                )}

            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    movies: state.movieMaster.movies,
    categories:state.movieMaster.categories,
    likes: state.movieMaster.likes
});

const ActionCreators = Object.assign(
    {},
    {getMovies,getCats,getLikes,updateLikes},
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Detail)
