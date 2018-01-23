import React, {Component} from 'react';
import {Text,Image, ToastAndroid} from 'react-native';
import {Content,Card,CardItem, Body,Thumbnail , Left, Icon, Button , Drawer, Container,Header, Right, List, ListItem , Item} from 'native-base';
import HTMLVIEW from 'react-native-htmlview';
import SideBar from './menu';
import AutoTags from 'react-native-tag-autocomplete';
import AppSoory from './AppSoory';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './AppFooter';
import Swiper from 'react-native-swiper';
import { Router, Scene, Actions} from 'react-native-router-flux';
import io from "socket.io-client/dist/socket.io.js";
import SocketIOClient from 'socket.io-client';
var e;
export default class Appemplois extends Component  {

    constructor(props){
    super(props)
    e = this;
this.socket=io.connect("http://192.168.0.96:3333", { transports: ['websocket'] }, {pingTimeout: 30000});
console.ignoredYellowBox = [
    'Setting a timer'
]

      this.state={

 data: [],
soory:false,
 filtre:'',
 info:'a'

  
  
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

//alert(id)
 return fetch('http://192.168.0.96:1337/lireUtilisateurs/Interesser?idUtilisateurs='+id)
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {

 this.setState({data:responseJson})

 
   }
    })
    .catch(error => {
      console.error(error);
    });

} 



 infoOffres(idOffre) {

Actions.detailsOffres({param1:idOffre});
 }
getFiltreUtilisateurs(){

var id= this.props.param1;
var pdp = this.props.param2;

  return fetch('http://192.168.0.96:1337/Filtre?id='+id)
    .then(response => response.json())
    .then(responseJson => {

      

      this.setState({filtre:responseJson.message})

      alert(this.state.filtre)
   
    })
    .catch(error => {
      console.error(error);
    });

}
  componentDidMount() {

    this.getData();
   
  }



   componentWillMount() {

this.socket.on("server-send",function(data){
e.setState({info:data})
e.getData();
ToastAndroid.show('Nouveaux demande de rencontres', ToastAndroid.SHORT);
});
    
   }

renderSoory() {
if(this.state.soory == true)
return(<AppSoory/>)

}
  test(){

    alert("a");
  }
accepteRencontre(idAccepte,index)
{
 
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/accepte/rencontre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idAccepte:idAccepte, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));
this.setState({data:data2})
ToastAndroid.show('Demande accepter', ToastAndroid.SHORT);
 

  

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
  infoUtilisateurs(idUtilisateurs) {

Actions.detailsRencontreDemande({param1:idUtilisateurs,maitre:this.props.param1,pdp:this.props.param2});
 }


render() {

let utilisaka=this.state.data.map(function(usaka, index){

return (



<Card key= {index}>

   
                
<List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: usaka.photoUtilisateur }} />
              </Left>
              <Body>
                <Text style={{color:'#5dade2'}} onPress={function(){ this.infoUtilisateurs(usaka.id) }.bind(this) }>{usaka.prenomUtilisateur}</Text>
                <Text style={{marginRight:6}}> <MyIcon name="transgender-alt" size = {12}/>&nbsp;{usaka.sexe}</Text>
                <Text> <MyIcon name="map-marker" size = {12} color="#a569bd"/>&nbsp; {usaka.localisation}</Text>
              </Body>
              <Right>
         
    
            
  <Text style={{fontSize:16,color:"#00ffaa" }} onPress={function(){ this.accepteRencontre(usaka.id,index) }.bind(this) }> <MyIcon name="user-plus" size = {16} color="#00ffaa" /> Accepter </Text>
  <Text style={{fontSize:16,color:"#ff6666",marginRight:15}} onPress={function(){ this.ignorer(item.id1,key) }.bind(this) } > <MyIcon name="close" size = {16} color="#ff6666" /> Ignorer </Text>
              </Right>
          
            </ListItem>
          </List> 

</Card>

            
     
  )



},this);
return(
<Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} pdp={this.props.param2} id={this.props.param1} filtre={this.state.filtre}/>}
        onClose={() => this.closeDrawer()} 

        >
    <Icon name='menu' onPress={()=> this.openDrawer()} style = {{color:'blue'}}/> 
{this.renderSoory()}
<Content>

{utilisaka}



</Content>

</Drawer>
  );

}


}



module.export= Appemplois;