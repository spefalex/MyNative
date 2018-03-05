import React, { Component } from 'react'
import SideBar from './menu';
import {Drawer, Container, Header, DeckSwiper, Card,Right,List,ListItem,Item,CardItem, Thumbnail, Separator,Left, Body, Icon, Button,Footer , FooterTab } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './AppFooter';
import FooterAction from './FooterAction';
import { Router, Scene, Actions} from 'react-native-router-flux';
import HTMLVIEW from 'react-native-htmlview';
import AppSoory from './AppSoory';
import io from "socket.io-client/dist/socket.io.js";
import SocketIOClient from 'socket.io-client';
import {
  Text,
  View,
  Image,
  ToastAndroid
} from 'react-native'
import Swiper from 'react-native-swiper';


var e;
export default class extends Component {
     constructor(props){
    super(props)
      e = this;
  //this.socket=io("http://192.168.0.96:3000",{jsonp:false});
this.socket=io.connect("http://192.168.0.96:4444", { transports: ['websocket'] }, {pingTimeout: 30000});
console.ignoredYellowBox = [
    'Setting a timer'
]
      this.state={

 items: [],
 soory:false,
 info:'a'


  
  
         }




   }

   componentWillMount() {

this.socket.on("server-send",function(data){
e.setState({info:data})
e.getData();
ToastAndroid.show('Nouveaux offres correspond à vous', ToastAndroid.SHORT);
});
    
   }

getData () {
var id= this.props.param1;
var pdp = this.props.param2;


 return fetch('http://192.168.0.96:1337/Acceuils/Utilisateurs?id='+id)
    .then(response => response.json())
    .then(responseJson => {


if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
Actions.soory()
 this.setState({soory:true})
 

}
 else  {

 this.setState({items:responseJson.emploies})

 
   }
    })
    .catch(error => {
      console.error(error);
    });

}  

 infoOffres(idOffre) {

Actions.detailsOffres({param1:idOffre, idUser:this.props.param1 ,pdp:this.props.param2, prenom:this.props.prenom});
 }
 getFiltreUtilisateurs(){

var id= this.props.param1;
var pdp = this.props.param2;

  return fetch('http://192.168.0.96:1337/Filtre?id=5a546cc15cb576092a8b1a20')
    .then(response => response.json())
    .then(responseJson => {

      

      this.setState({filtre:responseJson.message})

    
   
    })
    .catch(error => {
      console.error(error);
    });

}
  componentDidMount() {

    this.getData();
    this.getFiltreUtilisateurs();   
  }

   infoUtilisateurs(idUtilisateurs) {

Actions.detailsRencontre({param1:idUtilisateurs});
 }

   infoInstitutions(idInstitution,logo) {

Actions.detailsEntreprise({param1:idInstitution, param2:logo, param3:this.props.param1,prenom:this.props.prenom,pdp:this.props.param2});
 }

 renderSoory() {
if(this.state.soory == true)
return(<Text> Personalize votre filte</Text>)

}
  test(){

    alert("a");
  }
ignorer(idOffres,index)
{

 

 idUtilisateur= this.props.param1;
  fetch('http://192.168.0.96:1337/Ignorer/Offre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idOffreEmploi:idOffres, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


  data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));


   this.setState({items:data2})
ToastAndroid.show('emplois ignorer', ToastAndroid.SHORT);


   if(this.state.items.length == 0) {

    this.setState({soory:true})

    Actions.soory();
   }
  

})
.catch((err) => { console.log(err); });


}

sauvegarder(idOffres,index)
{
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/Sauvegarder/Offre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idOffreEmploi:idOffres, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


  data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));


   this.setState({items:data2});
ToastAndroid.show('emplois sauvegarder', ToastAndroid.SHORT);
   if(this.state.items.length == 0) {
    this.setState({soory:true})
    Actions.soory()
   }
  

})
.catch((err) => { console.log(err); });


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
      
       
      <Container>
   <AppFooter pdp={this.props.param2} id={this.props.param1} prenom={this.props.prenom}/> 
      <Swiper showsPagination={false}>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} >
              
       
           <List style={{marginTop:0}}>
            <ListItem avatar style={{alignSelf:'center'}}>
              <CardItem>
                <Image source={{uri:item.logo}} style={{height: 150, width: null, flex: 1}}/>

            </CardItem>
                              </ListItem>
         <Text style= {{color:"#0e76a8", alignSelf:'center' }} onPress={function(){ this.infoOffres(item.id) }.bind(this) } > {item.titreEmploi.toUpperCase()} </Text>
              

              <ListItem>
              <Body>
               
                

                <Text note> <MyIcon name="map-marker" /> &nbsp; {item.adresse[0].ville} </Text> 

                <Text><MyIcon name="table" /> &nbsp;{item.typeContrat}</Text>
                <Text style={{marginTop:12}}> <MyIcon name="clock-o" /> &nbsp;{item.dateLimite} </Text>
              </Body>
          
            </ListItem>
          </List>
               
<CardItem>
<Left>


<Body>





<Text>
<MyIcon name="bookmark-o" /> &nbsp;{item.domaine} &nbsp; <MyIcon name="folder-open-o" onPress={function(){ this.infoInstitutions(item.idInstitution,item.logo) }.bind(this) } />&nbsp;<Text onPress={function(){ this.infoInstitutions(item.idInstitution,item.logo) }.bind(this) } >{item.nomInstitution} </Text>
</Text>
</Body>
</Left>
</CardItem>



<CardItem>
<Text> <MyIcon name="tags" /> &nbsp; {item.tagsEmploi.toString()}  </Text>
</CardItem>

     <View
  style={{
    borderBottomWidth: 1,
    borderBottomColor: '#e0ebeb',
    width: 301,
    alignSelf:'center'
  }}
/>
  <Item>
  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}} >

  
            <ListItem itemHeader>
    <Text style={{fontSize:16,color:"#ff6666"}} onPress={function(){ this.ignorer(item.id,key) }.bind(this) } > <MyIcon name="close" size = {16} color="#ff6666" /> Ignorer </Text>
            </ListItem>
  
            <ListItem>
  <Text style={{fontSize:16,color:'#00ffaa'}} onPress={function(){ this.sauvegarder(item.id,key) }.bind(this) }> <MyIcon name="star-o" size = {16} color="#00ffaa" /> Sauvegarder </Text>
            </ListItem>

  
            <ListItem>
            <Text style={{fontSize:16,color:'#99bbff'}} onPress={function(){ this.participe(item.id,key) }.bind(this) }> <MyIcon name="heart-o" size = {16} color="#99bbff" /> Matcher </Text>
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