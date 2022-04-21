import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text, SafeAreaView, FlatList, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import {getMovies,getCats,getLikes} from "./src/redux/actions/movieAction";
import { bindActionCreators } from 'redux';
import axios from "axios";
import {API_BASE} from "./src/constants";
import {Title} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";


class App extends Component {


  getMovies(id,name){
    let {movies,actions}= this.props




    axios.get(API_BASE(`/movie/${id}/lists`)).then(data=>{
      let newData={
        name,
        list:data.data
      }
      movies.push(newData)





      actions.getMovies(movies.reverse())
      // alert(JSON.stringify(this.props.movies))
      if(movies.length>4){
      // alert(JSON.stringify(movies[0]))
      }
      // alert(this.props.movies.length)
      this.forceUpdate()
    }).catch(e=>{
      console.log(e)
    })

  }

  getCats(){
    let {categories,actions}= this.props
    axios.get(API_BASE('/genre/movie/list')).then(data=>{
      categories=data.data.genres
      actions.getCats(categories)
      for(let i=0;i<5;i++){
        let randomID= Math.round(Math.random()*50)+1
        setTimeout(()=>{
          if(categories.length>0){
            this.getMovies(categories[i].id,categories[i].name)
          }
        },500*i)
      }
    }).catch(e=>{
      console.log(e)
    })

  }
  componentDidMount() {
    if(this.props.movies.length<1){
    this.getCats()
      AsyncStorage.getItem('likes').then(data=>{
        if(data){
          const {actions} = this.props
          // alert('data var')
          actions.getLikes(JSON.parse(data))
        }else{
          const {actions} = this.props
          actions.getLikes([])
        }
      })
    }
  }

  render() {



    const { movies } = this.props;
    return (
        <SafeAreaView styles={styles.container}>


          {movies.length >0 && (
              <FlatList  data={movies} style={{marginBottom:0}} renderItem={({item})=>{
                let moviesList=movies.find(movieItem=>{
                  if(item.name==movieItem.name){

                    return movieItem
                  }
                })
                // alert(moviesList.name)
                return(
                    <View style={{marginVertical:20}}>
                      <Title style={{marginVertical:20}}>{item.name}</Title>
                    <FlatList showsVerticalScrollIndicator={false} data={moviesList.list.results} renderItem={({item})=>{
                      return(
                          <View>
                          <TouchableOpacity
                              onPress={()=>{
                                this.props.navigation.navigate('Detail',{item})
                              }}
                              style={{backgroundColor:'blue',width:100,height:150,borderRadius:10,marginHorizontal:10,
                            justifyContent:'center',alignItems:'center'}}>
                            <Title style={{color:'white'}}>{JSON.stringify(item.name)[1].toUpperCase()}</Title>

                          </TouchableOpacity>
                            <Text style={{textAlign:'center',marginTop:10}}>{item.name.split(' ')[0]}</Text>
                          </View>
                      )

                    }
                    } horizontal={true} showsHorizontalScrollIndicator={false}/>
                    </View>
                )
              }} />
          )}
        </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:100
  }
});

const mapStateToProps = state => ({
  movies: state.movieMaster.movies,
  categories:state.movieMaster.categories,
  likes: state.movieMaster.likes
});

const ActionCreators = Object.assign(
    {},
    {getMovies,getCats,getLikes},
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
