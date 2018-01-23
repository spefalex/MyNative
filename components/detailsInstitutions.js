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

export default class AppDetailsInstituitons extends Component  {

    constructor(props){
    super(props)
      

      this.state={

 data: [],
soory:false,
 filtre:''

  
  
         }
   }

closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }
  infoUtilisateurs(idUtilisateurs) {

Actions.detailsRencontre({param1:idUtilisateurs,maitre:this.props.param1,pdp:this.props.param2});
 }

getData () {
var id= this.props.param1;
var pdp = this.props.param2;

//alert(id)
 return fetch('http://192.168.0.96:1337/lire/Offre/institutions?idInstitution='+id)
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

renderSoory() {
if(this.state.soory == true)
return(<AppSoory/>)

}
  test(){

    alert("a");
  }
ignorer(idOffres,index)
{

 

  idUtilisateur = this.props.param1;
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


  data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));


   this.setState({data:data2})
ToastAndroid.show('emplois ignorer', ToastAndroid.SHORT);
   if(this.state.data.length == 0) {

    this.setState({soory:true})
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


  data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));


   this.setState({data:data2});
ToastAndroid.show('emplois sauvegarder', ToastAndroid.SHORT);
   if(this.state.data.length == 0) {
    this.setState({soory:true})
   }
  

})
.catch((err) => { console.log(err); });


}
participe(idOffres,index)
{
 
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/Participe/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idOffres:idOffres, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


  data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));

ToastAndroid.show('Formation ajouter', ToastAndroid.SHORT);
   this.setState({data:data2})

   if(this.state.data.length == 0) {

    this.setState({soory:true})
   }
  

})
.catch((err) => { console.log(err); });


}
render() {

let emplois=this.state.data.map(function(emploisData, index){

return (



<Card key= {index}>

   
                
    <Content>
          <List>
            <ListItem itemDivider>
              <Thumbnail square size={80} source={{uri:emploisData.logo}}/>
              <Body>
                <Text> <MyIcon name="folder-open-o" />{emploisData.nomInstitution} </Text>
 <Text style= {{color:"#0e76a8" , marginTop:'1%'}}> {emploisData.titreEmploi.toUpperCase()} </Text>

              </Body>
            </ListItem>
          </List>
        </Content>




<MyIcon name ="chevron-right" size={30} style={{marginLeft:350}} onPress={function(){ this.infoOffres(emploisData.id) }.bind(this) } />
<CardItem>

  <List>
            <ListItem>
              <Text><MyIcon name="map-marker" /> &nbsp; {emploisData.adresse[0].ville} </Text>
            </ListItem>
            <ListItem>
              <Text><MyIcon name="table" /> &nbsp; {emploisData.typeContrat}</Text>
            </ListItem>
            <ListItem>
              <Text><MyIcon name="bookmark-o" /> &nbsp; {emploisData.domaine} &nbsp;</Text>
            </ListItem>
              <ListItem>
              <Text><MyIcon name="bookmark-o" /> <MyIcon name="clock-o" /> &nbsp;{emploisData.dateLimite} </Text>
            </ListItem>
          </List>


</CardItem>

      <Item>
  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}} >

  
            <ListItem itemHeader>
    <Text style={{fontSize:16,color:"#ff6666"}} onPress={function(){ this.ignorer(emploisData.id,index) }.bind(this) } > <MyIcon name="close" size = {16} color="#ff6666" /> Ignorer </Text>
            </ListItem>
  
            <ListItem>
  <Text style={{fontSize:16,color:'#00ffaa'}} onPress={function(){ this.sauvegarder(emploisData.id,index) }.bind(this) }> <MyIcon name="star-o" size = {16} color="#00ffaa" /> Sauvegarder </Text>
            </ListItem>

  
            <ListItem>
            <Text style={{fontSize:16,color:'#99bbff'}} onPress={function(){ this.participe(emploisData.id,index) }.bind(this) }> <MyIcon name="heart-o" size = {16} color="#99bbff" /> Matcher </Text>
            </ListItem>
          </List>     
  </Item>  

</Card>

            
     
  )



},this);
return(
<Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} pdp={this.props.param2} id={this.props.param1} filtre={this.state.filtre}/>}
        onClose={() => this.closeDrawer()} 

        >
 
{this.renderSoory()}
<Content>

{emplois}



</Content>

</Drawer>
  );

}


}



module.export= AppDetailsInstituitons;