/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HTMLView from 'react-native-htmlview';
import SideBar from './menu';
import {
  AppRegistry,
  StyleSheet,
 View
} from 'react-native';
import { Container, Drawer, Content, List, ListItem, InputGroup, Input, Icon ,Text, Button,Card,CardItem,Body,Thumbnail} from 'native-base';

export default class UtilisateursFb extends Component {


    constructor(props)
    {
        super(props);

    }
  


  render() {

   

return (
  
 
                <Card>
             
<CardItem>
<Body>


 <Thumbnail square size={80} source={require('../img/logo.png')} />

  <Text>{this.props.data.name}</Text>
    <Text>{this.props.data.name} </Text>

</Body>

</CardItem>
                </Card>
               
               

  )

   
    return (
      
 <Container>
        

      





 </Container>
 
    );
  }

    
}



const styles = StyleSheet.create({
  bodyText : {
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color:'red',
  },

});



 module.export= UtilisateursFb;

