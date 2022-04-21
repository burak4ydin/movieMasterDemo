import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import {getCats, getMovies, getLikes, updateLikes} from "../../redux/actions/movieAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Icon, Spinner, Title} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

const Likes =(props)=>{
    const [likes,setLikes]=useState(props.likes)
    const [loading,setLoading] = useState(false)

    let spliceArray=(array,index)=>{
        let newArray= array
        newArray.splice(index,1)
        const {actions}=props
        actions.updateLikes(newArray)
        AsyncStorage.setItem('likes',(JSON.stringify(newArray)))
        setLikes(newArray)
        setTimeout(()=>{

        setLoading(false)
        },1000)
    }
    setInterval(()=>{
        setLoading(true)
        setLoading(false)
    },1000)
    return(
        <SafeAreaView style={{backgroundColor:'white',flex:1,alignItems:'center'}}>
            <Title>LIKED MOVIES</Title>
            {likes.length>0 ? (
                    <View style={{width:'100%',height:'100%',backgroundColor:'white',}}>
                        {loading ? (
                            <Spinner size={'large'} color={'blue'}/>
                        ):(
                            <FlatList showsVerticalScrollIndicator={false} data={props.likes} style={{backgroundColor:'white',}} contentContainerStyle={{}} renderItem={({item})=>{
                                return(

                                    <View style={{width:'100%',height:150,backgroundColor:'white',marginVertical:20,justifyContent:'center',alignItems:'center'}}>

                                        <View style={{width:'90%',height:100,paddingHorizontal:30,backgroundColor:'blue',borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                            <Title style={{color:'white'}}>
                                                {item.name[0].toUpperCase()}
                                            </Title>
                                            <Title style={{color:'white',width:100}}>
                                                {item.name}
                                            </Title>
                                            <TouchableOpacity onPress={()=>{
                                                setLoading(true)
                                                let oldList=props.likes

                                                oldList.find((value,index)=>{
                                                    if(value){

                                                        if(value.name==item.name){

                                                            spliceArray(oldList,index)

                                                        }
                                                    }


                                                })
                                            }}>
                                                <Icon  style={{color:'white'}} name={'heart-dislike'}/>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                )
                            }
                            } />
                        )}

                    </View>

            ):(
                <Title>NO LIKED MOVIE</Title>
            )}


        </SafeAreaView>
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

export default connect(mapStateToProps,mapDispatchToProps)(Likes)
