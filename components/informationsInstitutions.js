import React, { Component } from 'react';
import { Container, Header, Title,ListItem,List, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, CardItem, Card, Thumbnail } from 'native-base';
import {
  AppRegistry,
  Image
} from 'react-native';
import MyIcon from 'react-native-vector-icons/FontAwesome';
export default class AnatomyExample extends Component {

      constructor(props){
    super(props)
      

      this.state={

 data: [],
soory:false,
 filtre:'', 
 ville:'',
 adresse:''
  
  
         }
   }

closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }


getData () {
var id= this.props.param1;

//alert(id)
 return fetch('http://192.168.0.96:1337/Informations/Institution?idInstitution='+id)
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {

 this.setState({data:responseJson.institutions, ville:responseJson.institutions.localisationInstitution[0].ville,adresse:responseJson.institutions.localisationInstitution[0].adresse})

 

 
   }
    })
    .catch(error => {
      console.error(error);
    });

} 

  componentDidMount() {

    this.getData();
   
  }
  render() {
    return (
      <Container>
        
        <Content>
         <Card>
            <CardItem>
             
          
 <List>
             <ListItem>
             <Text><MyIcon name="folder-open-o"/> {this.state.data.nom} </Text>
            </ListItem>
            <ListItem>
              <Text><MyIcon name="map-marker" /> &nbsp; {this.state.ville} </Text>
            </ListItem>
           
            <ListItem>
              <Text><MyIcon name="map-marker" /> &nbsp; {this.state.adresse} &nbsp;</Text>
            </ListItem>
              <ListItem>
              <Text><MyIcon name="bookmark-o" />  &nbsp;{this.state.data.siteWeb} </Text>
            </ListItem>
            <ListItem>
              <Text><MyIcon name="bookmark-o" />  &nbsp;{this.state.data.email} </Text>
            </ListItem>

             <ListItem>
              <Text><MyIcon name="bookmark-o" /> &nbsp;{this.state.data.telephone} </Text>
            </ListItem>

             <ListItem>
              <Text><MyIcon name="bookmark-o" /> &nbsp;{this.state.data.domaine} </Text>
            </ListItem>
 <ListItem>
              <Text><MyIcon name="bookmark-o" />  &nbsp;{this.state.data.dateCreation} </Text>
            </ListItem>
             <ListItem>
              <Text><MyIcon name="bookmark-o" /> &nbsp;{this.state.data.nombreSalarie} </Text>
            </ListItem>

</List>             
            </CardItem>
            <CardItem>
             <Text> {this.state.data.presentation} </Text>
            </CardItem>
            
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Suivre </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}