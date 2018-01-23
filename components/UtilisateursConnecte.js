/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import UtilisateursDonnes from './UtilisateursDonnes';
import { Drawer } from 'native-base';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
 View
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon ,Text, Button,Card,CardItem,Body,Left} from 'native-base';

export default class UtilisateursBody extends Component {

  constructor(){
    super()

this.state={

  data:[],
  cards:[''],
  
  
    }
}

getDonnesUtilisateurs(){

var id = this.props.param1;
return fetch('http://192.168.0.96:1337/Informations/Utilisateur?id='+id)
.then((response)=> response.json())
.then((responseJson)=>{
var datasend=JSON.stringify(responseJson.utilisateur);
alert(id);
this.setState({data:responseJson.utilisateur});
 console.log(responseJson);

})
.catch((error)=> {
console.error(error);
  });

}

componentDidMount(){

this.getDonnesUtilisateurs();
this.getDonnesOffres();

}
getDonnesOffres(){
var id = this.props.param1;


  return fetch('http://192.168.0.96:1337/Acceuils/Utilisateurs?id='+id)
    .then(response => response.json())
    .then(responseJson => {

      var arrObj = [];
      var obj = responseJson.emploies;

      
      for(var i=0 ; i<obj.length; i++) {

arrObj.push({'logo': obj[i].logo,'nomInstitution': obj[i].nomInstitution , 'titreEmploi':obj[i].titreEmploi, 'description':obj[i].description});
 
      }


 
      this.setState({cards:arrObj});
   
    })
    .catch(error => {
      console.error(error);
    });

}





  render() {

   
    return (

    
        <Container>
      
 <UtilisateursDonnes data={this.state.data} cardSource = {this.state.cards}/>

 
        </Container>


    );
  }

    
}







 module.export= UtilisateursBody;

