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
  
    }
}

getDonnesUtilisateurs(){

var id = this.props.param1;
return fetch('http://172.19.0.1:1337/Informations/Utilisateur?id='+id)
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

}
getDonnesEvenements(){

var id = this.props.param1;
return fetch('http://172.19.0.1/:1337/Acceuils/Utilisateurs?id='+id)
.then((response)=> response.json())
.then((responseJson)=>{

 alert(responseJson.evenement.status);


})
.catch((error)=> {
console.error(error);
  });

}





  render() {

   
    return (

    
        <Container>
      
 <UtilisateursDonnes data={this.state.data}/>

 
        </Container>


    );
  }

    
}







 module.export= UtilisateursBody;

