import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import PokedexService from '../services/PokedexService'
import {TYPES_COLORS} from '../constants/index.js'
import axiosCancel from 'axios-cancel';
const axios  = require('axios');
export default class PokedexDetails extends React.Component {
    constructor(props){

        super(props)
        this.state = {
          pokemon:null,
          properties:null,
          isLoading:true
        };

        axiosCancel(axios, {
            debug: false // default
        });
    }

    componentDidMount(){
      let {pokemon} = this.props.navigation.state.params;
      this.setState({pokemon});
      PokedexService.getPokemon(pokemon.id).then((results)=>{
        
        if(results && results.data){

            this.setState({
                properties:results.data,
                isLoading:false
            })
        }
      }).catch((err)=>{
        console.log("Error")
      });
    }

    componentWillUnmount(){
        axios.cancelAll();
    }

    render() {

      if(!this.state.properties){
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator></ActivityIndicator>
            </View>
          )
      }    

      let {img, name } = this.state.pokemon;
      let {base_experience, height, order, weight, abilities, forms, moves, types } = this.state.properties;

      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.itemText}>{`${name}`}</Text>
          <Image style={styles.itemImage} source={{uri:img}} />
          <Text style={styles.description}>Order: {order}</Text>
          <Text style={styles.description}>Experience: {base_experience}</Text>
          <Text style={styles.description}>Height: {height}</Text>
          <Text style={styles.description}>Weight: {weight}</Text>
          <Text style={styles.sectionTitle}>Types:</Text>
          <View style={styles.group}>
              {types.map( (el, index)=> <Text key={`tp-${index}`} style={[styles.itemGroup, {backgroundColor:TYPES_COLORS[el.type.name], overflow:'hidden', color:'white'}]}>{el.type.name}</Text> )}
          </View>
          <Text style={styles.sectionTitle}>Abilities:</Text>
          <View style={styles.group}>
              {abilities.map( (el, index)=> <Text key={`ab-${index}`} style={styles.itemGroup}>{el.ability.name}</Text> )}
          </View>
          <Text style={styles.sectionTitle}>Forms:</Text>
          <View style={styles.group}>
              {forms.map( (el, index)=> <Text key={`fm-${index}`} style={styles.itemGroup}>{el.name}</Text> )}
          </View>
          <Text style={styles.sectionTitle}>Moves:</Text>
          <View style={styles.group}>
              {moves.map( (el, index)=> <Text key={`mv-${index}`} style={styles.itemGroup}>{el.move.name}</Text> )}
          </View> 
        </ScrollView>
      );
    }
  }

  let styles = StyleSheet.create({
    container:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#F6F5AE',
      paddingBottom:20
    },
    loadingContainer:{
      flexDirection:'column',
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#F6F5AE'
    },
    itemImage:{
      margin:20,
      width:250,
      height:250,
      borderRadius:125,
      backgroundColor:'white'
    },
    itemText:{
      fontSize:30,
      textAlign:'center',
      marginTop:20,
      fontWeight:'bold'
    },
    description:{
      fontSize:20,
      fontWeight:'bold'
    },
    sectionTitle:{
      fontSize:30,
      fontWeight:'bold',
      color:'#2E86AB',
      margin:10
    },
    group:{
      flexDirection:'row',
      flexWrap:'wrap'
    },
    itemGroup:{
      fontSize:16,
      borderRadius:5,
      borderWidth:1,
      padding:5,
      borderColor:'#2E86AB',
      color:'#2E86AB',
      margin:10
    }
  })