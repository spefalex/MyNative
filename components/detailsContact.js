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

import {Content,Card,CardItem, Body,Thumbnail , Left, Icon, Button , Drawer, Container,Header, Right, List, ListItem} from 'native-base';
import HTMLVIEW from 'react-native-htmlview';
import SideBar from './menu';
import AutoTags from 'react-native-tag-autocomplete';
import AppSoory from './AppSoory';
import MyIcon from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper';
import { Router, Scene, Actions} from 'react-native-router-flux';
import FooterRencontre from './FooterDetailsContact';

export default class MyNative extends Component {

      constructor(props){
    super(props)


      this.state={

 data: [],
soory:false,
poste:'',
nomSociete:'',
nombre:'',
diplome:'',
nomEtablissment:''

  
  
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
var pdp = this.props.param2;


 return fetch('http://192.168.0.96:1337/lireinformation/Utilisateur?idUser='+id)
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {

//  alert(responseJson.offre.sauvegardeEmploi.length)

 this.setState({data:responseJson.users, nomSociete:responseJson.users.informationEmploie[0].nomSociete, poste:responseJson.users.informationEmploie[0].poste,nombre:responseJson.users.utilisateurMatcher.length,diplome:responseJson.users.derniereFormation[0].diplome,nomEtablissment:responseJson.users.derniereFormation[0].nomEtablissement})



 
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
                <Thumbnail  source={{uri:this.state.data.photoUtilisateur}} />
                <Body>
                  <Text > {this.state.data.nomUtilisateur} {this.state.data.prenomUtilisateur}</Text>
   <Text style= {{fontSize:12}}> <MyIcon name="map-marker" size = {12} color="#a569bd"/>&nbsp; {this.state.data.localisation}</Text>
                      <Text style= {{fontSize:12}}> <MyIcon name="gift" size = {12} color="#003366" /> &nbsp;{this.state.data.age} ans,  <MyIcon name="transgender-alt" size = {12}/> &nbsp;{this.state.data.sexe}</Text>
                  <Text> <MyIcon name="heart" style={{ color: '#ED4A6A' }} /> &nbsp; {this.state.nombre}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:this.state.data.photoUtilisateur}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
         
            
              <Body>
                <Text> <MyIcon name="briefcase" size = {20}/> &nbsp; {this.state.nomSociete} {this.state.poste} </Text>
 <Text style= {{color:"#0e76a8" , marginTop:'1%'}}> <MyIcon name="graduation-cap" size = {20}/> {this.state.nomEtablissment} {this.state.diplome} </Text>

              </Body>
         
            </CardItem>

             <CardItem>
              <Body>
                <Text>
          <MyIcon name="user-circle-o" size = {20}/> &nbsp;        {this.state.data.aPropos}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
         <FooterRencontre idUserIgnorer={this.state.data.id} idUserMaitre={this.props.maitre} pdp={this.props.pdp}/>
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
