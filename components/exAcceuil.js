import React, { Component } from 'react'
import SideBar from './menu';
import {Drawer, Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Button,Footer , FooterTab } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './FooterRencontre';
import FooterAction from './FooterAction';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  Text,
  View,
  Image
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

  componentDidMount() {

    this.getData();
    
  }

   infoUtilisateurs(idUtilisateurs) {

Actions.detailsRencontre({param1:idUtilisateurs});
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

      <Swiper showsButtons>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} >
              
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:item.photoUtilisateur}} />
                    <Body>
                      <Text style={{color:'#5dade2'}}>{item.prenomUtilisateur}</Text>
                       <Text style= {{fontSize:12}}> <MyIcon name="map-marker" size = {12} color="#a569bd"/>&nbsp; {item.localisation}</Text>
                      <Text style= {{fontSize:12}}> <MyIcon name="gift" size = {12} color="#003366" /> &nbsp;{item.age} ans,  <MyIcon name="transgender-alt" size = {12}/> &nbsp;{item.sexe}</Text>
                       <Text> <MyIcon name="briefcase" size = {12}/> &nbsp; {item.informationEmploie[0].poste} {item.informationEmploie[0].nomSociete} </Text>
                     <MyIcon name ="chevron-right" size={30} style={{marginLeft:250}} onPress={function(){ this.infoUtilisateurs(item.id) }.bind(this) } />
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 250, flex: 1 }} source={{uri:item.photoUtilisateur}} />
                </CardItem>

                <CardItem>
           
                </CardItem>

         <Footer>
        
         <Button rounded warning  style={{marginLeft:3 , height:38}}><Text style={{fontSize:12}}> <MyIcon name="close" size = {18} color="#003366" /> Ignorer </Text></Button> 
   <Button rounded success style={{marginLeft:3 , height:38}}><Text style={{fontSize:12}}> <MyIcon name="star-o" size = {18} color="#003366" /> Sauvegarder </Text></Button> 
   <Button rounded info  style={{marginLeft:3 , height:38}}><Text style={{fontSize:12}}> <MyIcon name="heart-o" size = {18} color="#003366" /> Interesser </Text></Button> 
         </Footer>
            </View>

          )
        })}
      </Swiper>
          </Container>
      </Drawer>
    )

  }
}