/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import pick from './picker2.js';
import { Container,Spinner, Textarea,List,ListItem,Card, Content, Form, Item, Input, InputGroup, Button , Thumbnail, Icon ,CheckBox} from 'native-base';
import { Router, Scene, Actions} from 'react-native-router-flux';
var ImagePicker = require('react-native-image-picker');
const FilePickerManager = require('NativeModules').FilePickerManager;

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

import RNFetchBlob from 'react-native-fetch-blob';

export default class MyNewApp extends Component {
  
constructor(props) {

super(props);
{
  this.state ={
    file:null,
    datapdf:null,
    pdfSource:null,
    checked:false, 
    checked1:false,
    loading:false,
    amicale:'',
    profesionnelle:'',

  }
}
}

  show(){
pick((source,datapdf )=> this.setState({pdfSource:source, datapdf:datapdf }));
  }
checkboxTest(value) {

  this.setState({checked:!this.state.checked })


}

checkbox1 () {
this.setState({ checked1:!this.state.checked1})

}
renderButton(){

  if(this.state.loading){

    return <Spinner size="large"/>;
  }

  return (

          <Button block info onPress={this.upload.bind(this,this.state.checked,this.state.checked1)}>
            <Text>Enregistrer</Text>
          </Button>
    );
}

upload(typeRencontre1,typeRencontre2) {
var typeRencontre = [];

if(typeRencontre1==true && typeRencontre2 == false) 
{


  typeRencontre.push("amicale")

  //alert(typeRencontre)
} else if(typeRencontre1==true && typeRencontre2 == true) {


 typeRencontre.push("amicale","Professionelle")
// alert(typeRencontre)
} else {

 
typeRencontre.push("profesionnelle")
//alert(typeRencontre)
}

if(this.state.datapdf) {

RNFetchBlob.fetch('POST', 'http://192.168.0.96:1337/testtest2', {
Authorization : "Bearer access-token",
otherHeader : "foo",
   'Content-Type' : 'multipart/form-data',
  }, 

[{ name : 'info', data: 'spexe'},

  { name : 'avatar', filename : 'avatar.pdf', type:'application/pdf', data:this.state.datapdf}])

    .then((response) => JSON.stringify(response.json())) 
.then((responseData) => {



      
var urlUpload=responseData.toString().replace(/"/g, "");
var urlOfPDF= 'http://192.168.0.96/PDF/'+urlUpload.substr(urlUpload.lastIndexOf('/') + 1);


fetch('http://192.168.0.96:1337/miseAjour/infoSup', {
  method: 'PUT',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({aPropos:this.state.aPropos ,id:this.props.param1,  typeRencontre:typeRencontre, cv:urlOfPDF})
})
.then((response) => response.json()) 
.then((responseData2) => {
this.setState({loading:false})

Actions.acceuil({param1:this.props.param1,param2:this.props.param2,prenom:this.props.prenom});

 })
.catch((err) => { console.log(err); });


    

    
  }).catch((err) => {


    console.log(err);
    
  });
} else {

  alert("Inserer votre CV ");
}





}

  render() {
let pdf = this.state.datapdf == null? null:

<Thumbnail source={{uri:"http://192.168.0.96/IMAGES/file-512.png"}} />

    return (
   <Container>
        
        <Content>
  <Text style= {{alignSelf: 'center',color:'green'}}> Ajoutez plus d'informations </Text> 
 
         <Card>
         
        
       
      <List>
              <Item last>
              <MyIcon name="info-circle" size = {20} color="#28b463"/>
              <Textarea placeholder="A props de vous" 

style= {{width:350}}
        onChangeText={(aPropos)=>this.setState({aPropos})} value={this.state.aPropos}

              />
            
            </Item>


<Text> <MyIcon name="street-view" size = {20} color="#28b463" /> Type rencontre </Text>
                  <Item>
                  <Text>
{"\n"}

</Text> 

  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}}>

  <Text>  Amicale </Text>
            <ListItem>
              <CheckBox checked={this.state.checked} onPress= {()=>this.checkboxTest()}/>
            </ListItem>
  <Text>  Professionelle </Text>
            <ListItem>
                <CheckBox checked={this.state.checked1} onPress= {()=>this.checkbox1()}/> 
            </ListItem>


          </List>     
  </Item> 

          
       <Text onPress={this.show.bind(this)} > <MyIcon name="upload" size = {20} color="#28b463"onPress={this.show.bind(this)}  /> Ajoutez vos CV </Text>
     {pdf}

                    </List>

               
                    </Card>
                    {this.renderButton()}

        </Content>
      </Container>
    

    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyNewApp', () => MyNewApp);
