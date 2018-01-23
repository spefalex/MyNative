import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text ,Item, List, ListItem} from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';

import {
  
  ToastAndroid
} from 'react-native';
import { Router, Scene, Actions} from 'react-native-router-flux';
export default class FooterDetailsOffres extends Component {

    constructor(props)
    {
        super(props);

           this.state={



  eventy:'',
  rencontre:'',
  formation:'',
  a:'a',
  dataFormation: []
  
  
  
    }

    }
ignorer(idUserMaitre, idIgnorer)
{

 

 idUtilisateur= this.props.param1;
  fetch('http://192.168.0.96:1337/Ignorer/Rencontre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idUtilisateur:idUserMaitre, idIgnorer: idIgnorer})
})
.then((response) => response.json()) 
.then((responseData) => {




ToastAndroid.show(' ignorer', ToastAndroid.SHORT);
Actions.rencontre({param1:this.props.idUserMaitre, param2:this.props.pdp});

   if(this.state.items.length == 0) {

    this.setState({soory:true})

    Actions.soory();
   }
  

})
.catch((err) => { console.log(err); });


}


demandeRencontre(idUserMaitre, idDemande)
{
 
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.0.96:1337/demande/rencontre', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idDemande:idDemande, idUtilisateur: idUserMaitre})
})
.then((response) => response.json()) 
.then((responseData) => {


 

ToastAndroid.show('Demande envoyé', ToastAndroid.SHORT);
 
Actions.rencontre({param1:this.props.idUserMaitre, param2:this.props.pdp});
   if(this.state.items.length == 0) {
    this.setState({soory:true})
    Actions.soory()
   }
  

})
.catch((err) => { console.log(err); });


}



sauvegarder(idUtilisateur,idOffres)
{

 

 
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



ToastAndroid.show('emplois sauvegarder', ToastAndroid.SHORT);



Actions.acceuil({param1:this.props.idUser, param2:this.props.pdp});


  
  

})
.catch((err) => { console.log(err); });


}
   



  render() {
    return (
    
        <Footer>
       <Item>
  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}} >

  
            <ListItem itemHeader>
    <Text style={{fontSize:16,color:"#ff6666"}} onPress={function(){ this.ignorer(this.props.idUserMaitre,this.props.idUserIgnorer) }.bind(this) } > <MyIcon name="close" size = {16} color="#ff6666" /> Ignorer</Text>
            </ListItem>
  
            <ListItem>
  <Text style={{fontSize:16,color:'#00ffaa'}} onPress={function(){ this.sauvegarder(this.props.idUser,this.props.id) }.bind(this) }> <MyIcon name="star-o" size = {16} color="#00ffaa" /> Sauvegarder </Text>
            </ListItem>

  
            <ListItem>
            <Text style={{fontSize:16,color:'#99bbff'}} onPress={function(){ this.demandeRencontre(this.props.idUserMaitre,this.props.idUserIgnorer) }.bind(this) }> <MyIcon name="heart-o" size = {16} color="#99bbff" /> Matcher </Text>
            </ListItem>
          </List>     
  </Item>
        </Footer>
    
    );
  }
}

 module.export= FooterDetailsOffres;