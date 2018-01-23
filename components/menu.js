import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Icon, Badge, Image ,Thumbnail} from 'native-base';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import MyIcon from 'react-native-vector-icons/FontAwesome';
export default class Menu extends Component {

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

    getDataFormations(idaka,pdp) {

var id= idaka;
var filtre = this.props.filtre;
alert(pdp)

Actions.formations({param1:idaka, param2:pdp, param3:this.props.filtre});
} 

   getDataEvenements(idaka,pdp) {

var id= idaka;
var filtre = this.props.filtre;
alert(pdp)

Actions.evenements({param1:idaka, param2:pdp, param3:this.props.filtre});
} 
  getDataRencontre(idaka,pdp) {

var id= idaka;
var filtre = this.props.filtre;
alert(pdp)

Actions.rencontre({param1:idaka, param2:pdp, param3:this.props.filtre});
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
   
      <Content style={{ backgroundColor:'#2c3e50'}}>
      <View style={{backgroundColor:'#f4f6f7'}}>
 <Thumbnail source={{uri: this.props.pdp}} />
 </View>
      <List>
     
                        <ListItem iconLeft>
                            <MyIcon name='glass' size = {20} color="#a569bd"/>

<TouchableOpacity onPress={this.getDataEvenements.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15}}>Evenements {this.state.eventy} {this.state.id} </Text>
</TouchableOpacity>
                        </ListItem>
                        <ListItem iconLeft>
                            <MyIcon name='university' size = {20}  color="#5dade2"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Emploies</Text>
                            </TouchableOpacity>
                          
                        </ListItem>
                        <ListItem iconLeft >
                            <MyIcon name="graduation-cap" size = {20} color="#28b463"/>
                            <TouchableOpacity onPress={this.getDataFormations.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15}} >Formation {this.state.formation}</Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem iconLeft iconRight>
                            <MyIcon name='meetup' size = {20} color="#f1948a"/>
                            <TouchableOpacity onPress={this.getDataRencontre.bind(this,this.props.id, this.props.pdp)}>
                            <Text style = {{marginLeft:15 }}> Rencontre {this.state.rencontre}</Text>
                          </TouchableOpacity>
                        </ListItem>

                         <ListItem iconLeft iconRight>
                            <MyIcon name='wechat' size = {20} color="#0b5345"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Chat {this.state.rencontre}</Text>
                         </TouchableOpacity>  
                        </ListItem>
                          <ListItem iconLeft iconRight>
                            <Icon name='ios-notifications' size = {20}/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}}>Notification - Menu </Text>
                           </TouchableOpacity>
                        </ListItem>
                    </List>
      </Content>
    );
  }
}