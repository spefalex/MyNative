import React, { Component } from 'react';
import { Image, ListView } from 'react-native';
import {Drawer, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon , Button} from 'native-base';

import SideBar from './menu';

import { Router, Scene, Actions} from 'react-native-router-flux';

export default class Acceuil extends Component {

    constructor(props){
    super(props)
      
      this.state={

  cards:['', '', ''],
  acceuils: [],
  message:'',
  filtre:'',
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
getDonnesUtilisateurs(){

var id= this.props.param1;



  return fetch('http://192.168.57.1:1337/Acceuils/Utilisateurs?id='+id)
    .then(response => response.json())
    .then(responseJson => {

      var arrObj = [];
      var obj = responseJson.emploies;

      if(responseJson.message) {


arrObj.push({'logo': 'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg', 'titreEmploi':'SOORY', 'description':'Veuillez modifier votre filtre, aucune offre emploie correspond à votre cente d\'interet actuelle' });
 this.setState({cards:arrObj});
 this.setState({emploieTrouve:'grey', soory:true})
      }
        

        else {

        
      for(var i=0 ; i<obj.length; i++) {

arrObj.push({'logo': obj[i].logo,'id': obj[i].id,'nomInstitution': obj[i].nomInstitution , 'titreEmploi':obj[i].titreEmploi, 'description':obj[i].description});
 
      }


 
      this.setState({cards:arrObj});
   }
    })
    .catch(error => {
      console.error(error);
    });

}

getFiltreUtilisateurs(){

var id= this.props.param1;

  return fetch('http://192.168.57.1:1337/Filtre?id='+id)
    .then(response => response.json())
    .then(responseJson => {

      alert(responseJson.message)

      this.setState({filtre:responseJson.message})
   
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
 
 Actions.acceuil({param1:idUtilisateur, param2:photo});







 })
.catch((err) => { console.log(err); });

  }
}

renderImage(){



if(this.state.soory== true)
  return (
  <Image source={{uri:'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg '}} style={{height: 200, width: null, flex: 1}}/>
)
}

ignorer(idOffre)
{
  idUtilisateur = this.props.param1;
if(idOffre == null) {alert("filtre")} 

  else  {

  //alert('idOffre vaut:'+idOffre);

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

  //alert(idOffre)
 this.setState({message:'bien sauvegarder'})

Actions.acceuil({param1:idUtilisateur, param2:this.props.param2});
 





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

            renderItem={item =>
              <Card style={{ elevation: 3, height:3000}}>
                <CardItem >
                  <Left>
                    <Thumbnail source={{uri:item.logo}} />
{this.renderImage()}
                 
                    <Body>
                      <Text>{item.nomInstitution}</Text>
                      <Text note>{item.titreEmploi}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody >
                 <Text style={{alignSelf:'center'}}>{item.description}</Text>
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
                  </Drawer>

    );
  }
}