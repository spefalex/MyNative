import React, {Component} from 'react';
import {Text,Image, ToastAndroid} from 'react-native';
import {Content,Card,CardItem, Body,Thumbnail , Left, Icon, Button , Drawer, Container,Header, Right, List, ListItem , Item, FooterTab, Footer} from 'native-base';
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

var e;
export default class AppAvis extends Component  {

    constructor(props){
    super(props)
       e = this;

this.socket=io.connect("http://192.168.0.96:4444", { transports: ['websocket'] }, {pingTimeout: 30000});
console.ignoredYellowBox = [
    'Setting a timer'
]

      this.state={

 data: [],
soory:false,
 filtre:'',
 news:''

  
  
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
var id= this.props.param1;
var pdp = this.props.pdp;
var idUser= this.props.idUser;
var prenom = this.props.prenom;

//alert(id)
 return fetch('http://192.168.0.96:1337/read/avis?idInstitution='+id)
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {

 this.setState({data:responseJson.institutions});

 
   }
    })
    .catch(error => {
      console.error(error);
    });

} 

componentWillMount() {

  this.socket.on("send-avis",function(data){

e.getData();
e.setState({news:data})
ToastAndroid.show('Nouvelle commentaire', ToastAndroid.SHORT);
});
}

  componentDidMount() {

    this.getData();
   
  }


  

render() {

let avis=this.state.data.map(function(avisData, index){

return (



<Card key= {index}>

   
   
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: avisData.pdp  }} />
              </Left>
              <Body>
                <Text>{avisData.prenomUtilisateurs}</Text>
                <Text note> {avisData.avis}</Text>
                 <Text note> {avisData.note}</Text>
              </Body>
              <Right>
                <Text note>{avisData.datePublicationAvis}</Text>
              </Right>
            </ListItem>
          </List>    

</Card>

            
     
  )



},this);
return(

<Container>
<Content>

{avis}



</Content>
 <Footer>
          <FooterTab>
            <Button full onPress={function(){ this.donneAvis(this.props.pdp,this.props.idUser, this.props.prenom, this.props.param1, this.props.logo) }.bind(this)}>
              <Text >donneAvis </Text>
            </Button>
          </FooterTab>
        </Footer>
        </Container>
  );

}


}



module.export= AppAvis;