import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {Icon} from "native-base";
import {getCats, getMovies} from "../../redux/actions/movieAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const Search = (props)=>{
    const [text,setText]=useState('')
    const [movies,setMovies]=useState([props.movies[0].list.results[0]])
    const [source,setSource]=useState([])
    let movieList=props.movies.map(item=>{

        return item.list.results
    })
    // alert(JSON.stringify(props.movies[1].list.results[0]))


    let searchFunction = ()=>{
        let newArray =[]
            source.find(item=>{
            if(item.name.indexOf(text) > -1 ){
                newArray.push(item)
            }
            setMovies(newArray)
        })
        if(text.length == 0){
            setMovies(source)

        }

    }

    useEffect(()=>{
        let newArray = []
            props.movies.find(item=>{
                item.list.results.map(movie=>{
                newArray.push(movie)
            })
                setMovies(newArray)
                setSource(newArray)
        })



    },[setMovies])
    //
    // alert(JSON.stringify(props.movies[0].list.results))

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white',alignItems:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,}}>
                <TextInput
                    value={text}
                    style={{borderWidth:.5,width:200,padding:10,borderRadius:10,borderRightWidth:0,borderTopRightRadius:0,borderBottomRightRadius:0}}
                    onChangeText={string=> {
                        setText(string)
                        searchFunction()
                    }}
                    placeholder={'Search your favourite'}
                />
                <Icon name={'search-outline'} style={{borderRightWidth:.5,borderRadius:10,fontSize:25}}/>
            </View>

            <View style={{width:'100%',height:'100%',backgroundColor:'white',paddingBottom:100}}>

                <FlatList data={movies} keyExtractor={(item, index) => index} contentContainerStyle={{marginTop:20}} showsVerticalScrollIndicator={false} renderItem={({item})=>{
                    return(
                        <View style={{width:'100%',height:120,backgroundColor:'white',marginVertical:20,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                props.navigation.navigate('Detail', {item})}
                                }
                                style={{flexDirection:'row',backgroundColor:'darkgreen',width:'80%',height:100,borderRadius:15,alignItems:'center'}} >
                                <View style={{backgroundColor:'blue',borderRadius:10,height:'70%',width:'25%',marginLeft:20,justifyContent:'center',alignContent:'center'}}>
                                    <Text style={{color:'white',fontWeight:'bold',fontSize:25,textAlign:'center'}}>{item.name[0].toUpperCase()}</Text>

                                </View>
                                <View style={{width:'60%',height:'70%',borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                    <Text>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )

                }} />
            </View>

        </SafeAreaView>
    )
}
const mapStateToProps = state => ({
    movies: state.movieMaster.movies,
    categories:state.movieMaster.categories
});

const ActionCreators = Object.assign(
    {},
    {getMovies,getCats},
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Search)
