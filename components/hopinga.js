import React, { Component } from 'react';
import { Image, ListView , ToastAndroid} from 'react-native';
import {Drawer, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon , Button} from 'native-base';
import Swiper from 'react-native-swiper';
import SideBar from './menu';
import AppFooter from './AppFooter';
import { Router, Scene, Actions} from 'react-native-router-flux';
import MyIcon from 'react-native-vector-icons/FontAwesome';

export default class Acceuil extends Component {

    constructor(props){
    super(props)
      
      this.state={

  cards:['','','','','','','','',''],
  acceuils: [],
  message:'',
  filtre:'',
  data2:[],
  emploieTrouve:'',
  soory:false
  
  
    }
}



closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }


findWithAttr(id) {
  var indexOfStevie = this.state.cards.findIndex(i => i.id === id);

return indexOfStevie;
}

getDonnesUtilisateurs(){

var id= this.props.param1;
var pdp = this.props.param2;
  return fetch('http://192.168.57.1:1337/Acceuils/Utilisateurs?id='+id)
    .then(response => response.json())
    .then(responseJson => {

      var arrObj = [];
      var obj = responseJson.emploies;

      if(responseJson.message) {


arrObj.push({'logo': 'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg', 'titreEmploi':'Réglé votre parametre', 'description':'Veuillez modifier votre filtre, aucune offre emploie correspond à votre cente d\'interet actuelle' });
 this.setState({cards:arrObj});
 this.setState({emploieTrouve:'grey', soory:true})
      }
        

        else {

        
      for(var i=0 ; i<obj.length; i++) {

arrObj.push({'logo': obj[i].logo,'id': obj[i].id,'nomInstitution': obj[i].nomInstitution , 'titreEmploi':obj[i].titreEmploi, 'description':obj[i].description});
 
      }


 
      this.setState({cards:arrObj});
      alert(this.state.cards.length)
   }
    })
    .catch(error => {
      console.error(error);
    });

}

getFiltreUtilisateurs(){

var id= this.props.param1;
var pdp = this.props.param2;

  return fetch('http://192.168.57.1:1337/Filtre?id='+id)
    .then(response => response.json())
    .then(responseJson => {

      

      this.setState({filtre:responseJson.message})

      alert(this.state.filtre)
   
    })
    .catch(error => {
      console.error(error);
    });

}


componentDidMount(){

this.getDonnesUtilisateurs();
this.getFiltreUtilisateurs();


}
sauvegarder(idOffre)
{
  idUtilisateur = this.props.param1;
   photo= this.props.param2;
 var indexOfCards = this.state.cards.findIndex(i => i.id === idOffre);
var arrObj = [];
   if(idOffre == null) {
    alert("vous pouvez modifier votre filtre pour plus des resulats")
  }  else {

  fetch('http://192.168.57.1:1337/Sauvegarder/Offre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idOffreEmploi:idOffre, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {
 this.setState({message:'bien sauvegarder'})
 

data2 = this.state.cards.slice(indexOfCards+1).concat(this.state.cards.slice(0,indexOfCards));


   this.setState({cards:data2});

   
ToastAndroid.show('Offre bien sauvegarder', ToastAndroid.SHORT);
  if(this.state.cards.length==0) {
arrObj.push({'logo': 'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg', 'titreEmploi':'Réglé votre parametre', 'description':'Veuillez modifier votre filtre, aucune offre emploie correspond à votre cente d\'interet actuelle' });
 this.setState({cards:arrObj,soory:true});
    


   }


 })
.catch((err) => { console.log(err); });

  }
}

renderImage(){



if(this.state.soory == true)
  return (
  <Image source={{uri:'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg '}} style={{height: 200, width: null, flex: 1}}/>
)
}

ignorer(idOffre)
{
  idUtilisateur = this.props.param1;
  photo= this.props.param2;
  var indexOfCards = this.state.cards.findIndex(i => i.id === idOffre);
  var arrObj = [];
  if(idOffre == null) {
    alert("vous pouvez modifier votre filtre pour plus des resulats")
  } else 

  {

  fetch('http://192.168.57.1:1337/Ignorer/Offre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idOffreEmploi:idOffre, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {

  
 data2 = this.state.cards.slice(indexOfCards+1).concat(this.state.cards.slice(0,indexOfCards));


   this.setState({cards:data2});

  ToastAndroid.show('Offre ignorer', ToastAndroid.SHORT);

  if(this.state.cards.length==0) {
arrObj.push({'logo': 'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg', 'titreEmploi':'Réglé votre parametre', 'description':'Veuillez modifier votre filtre, aucune offre emploie correspond à votre cente d\'interet actuelle' });
 this.setState({cards:arrObj,soory:true});
    


   }

 })
.catch((err) => { console.log(err); });
}

}


  render() {
    return (
 <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} pdp={this.props.param2} id={this.props.param1} filtre= {this.state.filtre}/>}
        onClose={() => this.closeDrawer()} 

        >
        

          
  <Container>
<Icon name='menu' onPress={()=> this.openDrawer()} style = {{color:'blue'}}/>       
        <View style={{bottom:11}}>
          <DeckSwiper
            dataSource={this.state.cards}

            renderItem={item=>
              <Card style={{ elevation: 3, height:30000}}>
                <CardItem >
                  <Left>
                    <Thumbnail source={{uri:item.logo}} />
{this.renderImage()}

                 
                    <Body>
                     
                      <Text>{item.titreEmploi}</Text>
                    </Body>
                  </Left>
                </CardItem>
                 <Text note style= {{fontSize:12}}> <MyIcon name="folder-open-o" />{item.nomInstitution}</Text> 
                  <Text note style= {{fontSize:12}}> <MyIcon name="folder-open-o" />{item.typeContrat}</Text> 
                <CardItem cardBody >
                 <Text style={{alignSelf:'center'}}>{item.description}</Text>
                    <MyIcon name ="chevron-right" size={30} style={{marginLeft:150}} onPress={this.test}/>
                </CardItem>
                <CardItem>
             
          <Button bordered success   backgroundColor= {this.state.emploieTrouve}>
            <Text  backgroundColor= {this.state.emploieTrouve}>Matcher</Text>
          </Button>

     
          <Button bordered style={{marginLeft:3 }} onPress={this.sauvegarder.bind(this,item.id)}  backgroundColor= {this.state.emploieTrouve}>
            <Text  backgroundColor= {this.state.emploieTrouve}>Sauvegarder</Text>
          </Button>
               
          <Button bordered warning style={{marginLeft:3}} onPress={this.ignorer.bind(this,item.id)}  backgroundColor= {this.state.emploieTrouve}>
            <Text  backgroundColor= {this.state.emploieTrouve}>Ignorer</Text>
          </Button>

                </CardItem>
              </Card>
            }
          />
        </View>

      </Container>
      <AppFooter filtre= {this.state.filtre} id={this.props.param1} />
                  </Drawer>

    );
  }
}