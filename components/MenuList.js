import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Thumbnail } from 'native-base';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import MyIcon from 'react-native-vector-icons/FontAwesome';
export default class CardListExample extends Component {


  constructor(props)
    {
        super(props);

           this.state={



  eventy:'',
  rencontre:'',
  formation:'',
  id:'',
  dataFormation: []
  
  
  
    }

    }

  renderBack() {

    return(
 <Content>
      <Image source={require('../img/logo.png')}/>
    </Content>
    );
  }


 componentWillReceiveProps() {

  this.verifFiltre();
 
}
 getOut () {

Actions.out();


 }
    getDataFormations(idaka,pdp) {

var id= idaka;
var filtre = this.props.filtre;


Actions.formations({param1:idaka, param2:pdp, param3:this.props.filtre , prenom:this.props.prenom});
} 

   getDataEvenements(idaka,pdp) {

var id= idaka;
var filtre = this.props.filtre;


Actions.evenements({param1:idaka, param2:pdp, param3:this.props.filtre,prenom:this.props.prenom});
} 
  getDataRencontre(idaka,pdp) {

var id= idaka;
var filtre = this.props.filtre;


Actions.rencontre({param1:idaka, param2:pdp, param3:this.props.filtre,prenom:this.props.prenom});
} 
 monCompte(idaka,pdp) {

Actions.moncompte({param1:idaka, param2:pdp, prenom:this.props.prenom});

} 



  verifFiltre() {

if(this.props.filtre == 'rencontre feat emploies') {


  this.setState({rencontre:'#FF0000'})

}


 else if(this.props.filtre == 'emploies feat evenements') {


  this.setState({eventy:'#FF0000'})
 }

 else if(this.props.filtre == 'emploies feat formation') {


  this.setState({formation:'#FF0000'})
 }

 else if(this.props.filtre == 'read all') {


  this.setState({formation:'#FF0000', eventy:'#FF0000', rencontre:'#FF0000'})
 }


else if(this.props.filtre == 'rencontre feat emploies feat evenements') {


  this.setState({rencontre:'#FF0000', eventy:'#FF0000'})
 }


else if(this.props.filtre == 'formation feat emplois feat evenements') {


  this.setState({formation:'#FF0000', eventy:'#FF0000'})
 }



else if(this.props.filtre == 'rencontre feat emploies feat formation') {


  this.setState({formation:'#FF0000', rencontre:'#FF0000'})
 }

  }
  render() {
    return (
      <Container>
       
        <Content>
         <Thumbnail source={{uri: this.props.pdp}} />
          <Card>
            <CardItem>


<MyIcon name='glass' size = {20} color="#a569bd"/>

<TouchableOpacity onPress={this.getDataEvenements.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15}}>Evenements {this.state.eventy} {this.state.id} </Text>
</TouchableOpacity>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
              
              <CardItem>
               <MyIcon name="graduation-cap" size = {20} color="#28b463"/>
                            <TouchableOpacity onPress={this.getDataFormations.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15}} >Formation {this.state.formation}</Text>
                            </TouchableOpacity>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>

              <CardItem>
                <MyIcon name='meetup' size = {20} color="#f1948a"/>
                            <TouchableOpacity onPress={this.getDataRencontre.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15 }}> Rencontre {this.state.rencontre}</Text>
                          </TouchableOpacity>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
           
          
<CardItem>
  <MyIcon name='wechat' size = {20} color="#0b5345"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Chat {this.state.rencontre}</Text>
                         </TouchableOpacity>
                          <Right>
                <Icon name="arrow-forward" />
              </Right>
</CardItem>
<CardItem>
  <MyIcon name='user-o' size = {20} color="#0b5345"/>
                            <TouchableOpacity onPress={this.monCompte.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15}} >Mon compte </Text>
                         </TouchableOpacity>
                          <Right>
                <Icon name="arrow-forward" />
              </Right>
</CardItem>
 <CardItem>
                <MyIcon name='sign-out' size = {20} color="#ff1a1a"/>
                            <TouchableOpacity onPress={this.getOut}>
                            <Text style = {{marginLeft:15 }}> Déconnecté en tan que  {this.props.prenom}</Text>
                          </TouchableOpacity>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}