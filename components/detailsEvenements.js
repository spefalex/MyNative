/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image, ToastAndroid
} from 'react-native';

import {Content,Card,CardItem, Body,Thumbnail , Left, Icon, Button , Drawer, Container,Header, Right,ListItem,List,Item,Footer} from 'native-base';
import HTMLVIEW from 'react-native-htmlview';
import SideBar from './menu';
import AutoTags from 'react-native-tag-autocomplete';
import AppSoory from './AppSoory';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './FooterDetailsEvents';
import Swiper from 'react-native-swiper';
import { Router, Scene, Actions} from 'react-native-router-flux';
export default class MyNative extends Component {

      constructor(props){
    super(props)
      

      this.state={

 data: [],
soory:false,
adresse:'',
ville:'',
nombre:''

  
  
         }
   }

closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }



   getData () {
var id= this.props.param1;
var pdp = this.props.pdp;


var idUser= this.props.idUser;


 return fetch('http://192.168.0.96:1337/lireEvents?idEvenement='+id)
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {



 this.setState({data:responseJson.events, ville:responseJson.events.lieuEvenement, adresse:responseJson.events.adresse,nombre:responseJson.events.participant.length})



 
   }
    })
    .catch(error => {
      console.error(error);
    });

}

  componentDidMount() {

    this.getData();
  }
  render() {
    return (
  <Container>
      
        <Content>
          <Card>
           <CardItem>
<Left>


<Body>
<Text style= {{color:"#0e76a8" , marginTop:'1%', alignSelf:'center'}}>


 {this.state.data.nomEvenement} 


</Text>

<Text>
{"\n"}

</Text> 
<Text style={{marginRight:200}}> <MyIcon name="clock-o" />&nbsp;{this.state.data.dateFin} </Text>

<Text>
<MyIcon name="map-marker" /> &nbsp; {this.state.adresse} <MyIcon name="table" /> {this.state.data.typeContrat}
</Text>

<Text>
<MyIcon name="bookmark-o" /> &nbsp; {this.state.data.genreEvenement} <MyIcon name="folder-open-o" />{this.state.data.nomInstitution} 
</Text>
<Text>
 <MyIcon name="heart" style={{ color: '#ED4A6A' }} /> &nbsp;
Nombre de personne intéresser : {this.state.nombre}
</Text>

</Body>
</Left>
</CardItem>

<Text style={{alignSelf:'center'}}> <MyIcon name="briefcase" size = {25}/> Description des evenements </Text>
<CardItem content>

<HTMLVIEW value={this.state.data.detailsEvenement}/>

</CardItem>


 
  

           </Card>


        </Content>
        <AppFooter id={this.props.param1} idUser={this.props.idUser} pdp={this.props.pdp}/>
      </Container>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyNative', () => MyNative);
