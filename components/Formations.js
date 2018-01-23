import React, { Component } from 'react'
import SideBar from './menu';
import {Drawer, Container, Header, DeckSwiper, Card,Right,List,ListItem,Item,CardItem, Thumbnail, Separator,Left, Body, Icon, Button,Footer , FooterTab } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './FooterFormation';
import FooterAction from './FooterAction';
import { Router, Scene, Actions} from 'react-native-router-flux';
import HTMLVIEW from 'react-native-htmlview';
import AppSoory from './AppSoory'
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
 return fetch('http://192.168.0.96:1337/Acceuils/Formations?id='+id)
    .then(response => response.json())
    .then(responseJson => {


if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
Actions.soory()
 this.setState({soory:true})
 

}
 else  {

 this.setState({items:responseJson.formations})

 
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

  return fetch('http://192.168.0.96:1337/Filtre?id=5a546cc15cb576092a8b1a20')
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
    this.getFiltreUtilisateurs();   
  }

   infoUtilisateurs(idUtilisateurs) {

Actions.detailsRencontre({param1:idUtilisateurs});
 }


 renderSoory() {
if(this.state.soory == true)
return(<Text> Personalize votre filte</Text>)

}
  test(){

    alert("a");
  }

ignorer(idFormation,index)
{

 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/Ignorer/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idFormation:idFormation, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


 data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));


   this.setState({items:data2});
ToastAndroid.show('Formations ignorer', ToastAndroid.SHORT);
  if(this.state.items.length == 0) {
    this.setState({soory:true})
    Actions.soory()
   }
  

})
.catch((err) => { console.log(err); });


}

participe(idFormation,index)
{
 
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/Participe/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idFormation:idFormation, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


 data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));


   this.setState({items:data2});

ToastAndroid.show('Formation ajouter', ToastAndroid.SHORT);
 

   if(this.state.items.length == 0) {
    this.setState({soory:true})
    Actions.soory()
   }
  

})
.catch((err) => { console.log(err); });


}


sauvegarder(idFormation,index)
{
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/Sauvegarder/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idFormation:idFormation, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {



 data2 = this.state.items.slice(index+1).concat(this.state.items.slice(0,index));


   this.setState({items:data2});

ToastAndroid.show('Formations sauvegarder', ToastAndroid.SHORT);
  
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
         <AppFooter pdp={this.props.param2} id={this.props.param1}/> 
      <Container>

      <Swiper showsPagination={false}>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} >
              
       
           <List style={{marginTop:20}}>
            <ListItem avatar style={{alignSelf:'center'}}>
              
                <Image source={{uri:item.logo}} style={{height:150, width:250, alignSelf:'center' }}/>
        
                              </ListItem>
         <Text style= {{color:"#0e76a8", alignSelf:'center' }} onPress={function(){ this.infoOffres(item.id) }.bind(this) } > {item.nomFiliere.toUpperCase()} </Text>
              

              <ListItem>
              <Body>
               
                

                <Text note> <MyIcon name="map-marker" /> &nbsp; {item.lieuDeFormation} </Text> 

                <Text><MyIcon name="table" /> &nbsp;{item.typeFormation}</Text>
                <Text style={{marginTop:12}}> <MyIcon name="circle-o-notch" /> &nbsp;{item.domaineFormation} </Text>
                    <Text style={{marginTop:12}}> <MyIcon name="clock-o" /> &nbsp;{item.dateFinFormation} </Text>
              </Body>
          
            </ListItem>
          </List>
               
<CardItem>
<Left>


<Body>





<Text>
<MyIcon name="bookmark-o" /> &nbsp;{item.diplomeDeLivre} &nbsp; <MyIcon name="folder-open-o" />&nbsp;{item.nomInstitution} 
</Text>
</Body>
</Left>
</CardItem>



<CardItem>
<Text> tags d'emploie {item.tagsFormation}  </Text> 
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