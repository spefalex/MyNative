import React, { Component } from 'react'
import SideBar from './menu';
import {Drawer, Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Button,Footer , List ,FooterTab, Item, ListItem } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './FooterRencontre';

import FooterAction from './FooterAction';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  Text,
  View,
  Image,
  ToastAndroid
} from 'react-native'
import Swiper from 'react-native-swiper'



export default class extends Component {
     constructor(props){
    super(props)
      

      this.state={

 items: [],
 soory:false

  
  
         }
   }

   getData () {
var id= this.props.param1;
var pdp = this.props.param2;

alert(id)
 return fetch('http://192.168.0.96:1337/Acceuils/Rencontre?id='+id)
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {

 this.setState({items:responseJson.user})

 
   }
    })
    .catch(error => {
      console.error(error);
    });

} 
demandeRencontre(idDemande,index)
{
 
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/demande/rencontre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idDemande:idDemande, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {



if(responseData.message) {ToastAndroid.show('demande déjà envoyé', ToastAndroid.SHORT);} 
  
else {
data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));
this.setState({items:data2})
ToastAndroid.show('Demande bien envoyé', ToastAndroid.SHORT);
 
}
   if(this.state.items.length == 0) {
    this.setState({soory:true})
    Actions.soory()
   }
  

})
.catch((err) => { console.log(err); });


}



ignorer(idIgnorer,index)
{

 

 idUtilisateur= this.props.param1;
  fetch('http://192.168.0.96:1337/Ignorer/Rencontre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idUtilisateur:idUtilisateur, idIgnorer: idIgnorer})
})
.then((response) => response.json()) 
.then((responseData) => {




  data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));


   this.setState({items:data2})
ToastAndroid.show(' ignorer', ToastAndroid.SHORT);


   if(this.state.items.length == 0) {

    this.setState({soory:true})

    Actions.soory();
   }
  

})
.catch((err) => { console.log(err); });


}

  componentDidMount() {

    this.getData();
    
  }

   infoUtilisateurs(idUtilisateurs) {

Actions.detailsRencontre({param1:idUtilisateurs,maitre:this.props.param1,pdp:this.props.param2});
 }

  closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }

 
  render () {

    return (
  <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} pdp={this.props.param2} id={this.props.param1} filtre= {this.state.filtre}/>}
        onClose={() => this.closeDrawer()} 

        >
         <AppFooter pdp={this.props.param2} id={this.props.param1}/> 
      <Container>

      <Swiper showsPagination={false}>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} >
              
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:item.photoUtilisateur}} />
                    <Body>
                      <Text style={{color:'#5dade2'}} onPress={function(){ this.infoUtilisateurs(item.id) }.bind(this) }>{item.prenomUtilisateur}</Text>
                       <Text style= {{fontSize:12}}> <MyIcon name="map-marker" size = {12} color="#a569bd"/>&nbsp; {item.localisation}</Text>
                      <Text style= {{fontSize:12}}> <MyIcon name="gift" size = {12} color="#003366" /> &nbsp;{item.age} ans,  <MyIcon name="transgender-alt" size = {12}/> &nbsp;{item.sexe}</Text>
                       <Text> <MyIcon name="briefcase" size = {12}/> &nbsp; {item.informationEmploie[0].poste} {item.informationEmploie[0].nomSociete} </Text>
                    
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 250, flex: 1 }} source={{uri:item.photoUtilisateur}} />
                </CardItem>

                <CardItem>
           
                </CardItem>

         <Item>
  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}} >

  
            <ListItem itemHeader>
    <Text style={{fontSize:16,color:"#ff6666"}} onPress={function(){ this.ignorer(item.id,key) }.bind(this) } > <MyIcon name="close" size = {16} color="#ff6666" /> Ignorer </Text>
            </ListItem>
  
            <ListItem>
  <Text style={{fontSize:16,color:'#00ffaa'}} onPress={function(){ this.sauvegarder(item.id,key) }.bind(this) }> <MyIcon name="star-o" size = {16} color="#00ffaa" /> Sauvegarder </Text>
            </ListItem>

  
            <ListItem>
            <Text style={{fontSize:16,color:'#99bbff'}} onPress={function(){ this.demandeRencontre(item.id,key) }.bind(this) }> <MyIcon name="heart-o" size = {16} color="#99bbff" /> Matcher </Text>
            </ListItem>
          </List>     
  </Item>
            </View>

          )
        })}
      </Swiper>
          </Container>

      </Drawer>
    )

  }
}