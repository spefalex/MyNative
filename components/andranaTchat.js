import React, {Component} from 'react';
import {Text,Image, ToastAndroid} from 'react-native';
import {Content,Card,CardItem, Body,Thumbnail , InputGroup, Left,Textarea, Icon, Button , Drawer, Input,Container,Header, Right, List, ListItem , Item, FooterTab, Footer} from 'native-base';
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
import { GiftedChat } from 'react-native-gifted-chat';

var e;
export default class AppAvis extends Component  {

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
 news:'',
 message:'',
 photo1:'a',
 photo2:'b',
 idUser1:'a',
 idUser2:'A',
 idMaitre:''

  
  
         }



   }

closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }

donneAvis(pdp, idUser, prenom,institutions,logo) {
Actions.avis({pdp:pdp,idUser:idUser,prenom:prenom,institutions:institutions,logo:logo})
  
}
getData () {


 this.setState({data:this.props.responseData, idUser1:this.props.idUser1,idUser2:this.props.idUser2,idMaitre:this.props.param1});




} 
refreshMessages()
{
 
 

  idUtilisateur = this.props.idUser1;
  fetch('http://192.168.0.96:1337/read/Convsa', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idUser1:idUtilisateur, idUser2: this.props.idUser2})
})
.then((response) => response.json()) 
.then((responseData) => {


 this.setState({data:responseData[0].Conversation})


})
.catch((err) => { console.log(err); });


}

envoyeMessage(idMaitre) {

var idConvsa = this.props.idConvsa;
var maitre= this.props.idMaitre;
var text =this.state.message;
  fetch('http://192.168.0.96:1337/Envoye/Message', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idConvsa:idConvsa,idUtilisateur:maitre, text:text})
})
.then((response) => response.json()) 
.then((responseData) => {


  

   this.refreshMessages;
   this.setState({message:''})
  

})
.catch((err) => { console.log(err); });
}

getPhoto() {
var idUser1= this.props.idUser1;



 return fetch('http://192.168.0.96:1337/photo?idUser1='+idUser1)
    .then(response => response.json())
    .then(responseJson => {

this.setState({photo1:responseJson.photo1})

    })
    .catch(error => {
      console.error(error);
    });

}

getPhoto2() {
var idUser2= this.props.idUser2;



 return fetch('http://192.168.0.96:1337/photo2?idUser2='+idUser2)
    .then(response => response.json())
    .then(responseJson => {

this.setState({photo2:responseJson.photo2})

    })
    .catch(error => {
      console.error(error);
    });

}

  componentWillMount() {

    this.getData();
    this.getPhoto();
    this.getPhoto2();
this.socket.on("server-message",function(data){
e.setState({info:data})
e.refreshMessages();

});
   
  }


  

render() {

let message=this.state.data.map(function(msg, index){

return (



<Card key= {index} style={{width:"80%"}}>

   
   <List>
            <ListItem avatar>
              <Left >
             

             <Text>{msg[this.state.idUser1]}</Text>

              </Left>
              <Body>
               
              </Body>
              <Right style={{marginLeft:150}}>
              <Text >{msg[this.state.idUser2]}</Text>

              </Right>
            </ListItem>
          </List>
                
               
             

</Card>

            
     
  )



},this);
return(

<Container>
<Content>

{message}

 <InputGroup>
                       <Icon name="ios-person" />
       <Input placeholder="message" onChangeText={(message)=>this.setState({message})} value={this.state.message} />
                            </InputGroup>

</Content>
 <Footer>
          <FooterTab>
            <Button full onPress={function(){ this.envoyeMessage(this.state.idMaitre) }.bind(this) } >
              <Text >Envoyé  </Text>
            </Button>
          </FooterTab>
        </Footer>
        </Container>
  );














}


}



module.export= AppAvis;