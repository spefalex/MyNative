import React, { Component } from 'react';
import { Image } from 'react-native';
import {Drawer, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './AppFooter';
import SideBar from './menu';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: 'http://192.168.0.96/IMAGES/52a7d62ac0008bf23da5710b2e53f5f0--goku-super-super-saiyan.jpg',
  },
{
    text: 'Card One',
    name: 'One',
    image: 'http://192.168.0.96/IMAGES/52a7d62ac0008bf23da5710b2e53f5f0--goku-super-super-saiyan.jpg',
  },
  {
    text: 'Card One',
    name: 'One',
    image: 'http://192.168.0.96/IMAGES/52a7d62ac0008bf23da5710b2e53f5f0--goku-super-super-saiyan.jpg',
  },

  
];
export default class DeckSwiperExample extends Component {

   constructor(props){
    super(props)
      

      this.state={

 data: ['','','','',''],
 soory:false

  
  
         }
   }

   getData () {
var id= this.props.param1;
var pdp = this.props.param2;

alert(id)
 return fetch('http://192.168.0.96:1337/Acceuils/Rencontre?id=5a420bdac2ba920b19d5f75b')
    .then(response => response.json())
    .then(responseJson => {
if(responseJson.message) {

alert("acune evenements correspond a votre centre interet")
 this.setState({soory:true})

}
 else  {

 this.setState({data:responseJson.user})
alert(this.state.data)
 
   }
    })
    .catch(error => {
      console.error(error);
    });

} 

  componentDidMount() {

    this.getData();
    
  }

  closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }

information(parametre) 
{
 // alert(parametre)

var diplome = parametre;

alert(diplome[0].diplome)
}

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} pdp={this.props.param2} id={this.props.param1} filtre= {this.state.filtre}/>}
        onClose={() => this.closeDrawer()} 

        >
        <Icon name='menu' onPress={()=> this.openDrawer()} style = {{color:'blue'}}/>  
      <Container>
             <View>
          <DeckSwiper
            dataSource={this.state.data}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:item.photoUtilisateur}} />
                    <Body>
                      <Text style={{color:'#5dade2'}}>{item.prenomUtilisateur}</Text>
                       <Text style= {{fontSize:12}}> <MyIcon name="map-marker" size = {12} color="#a569bd"/>&nbsp; {item.localisation}</Text>
                      <Text style= {{fontSize:12}}> <MyIcon name="gift" size = {12} color="#003366" /> &nbsp;{item.age} ans,  <MyIcon name="transgender-alt" size = {12}/> &nbsp;{item.sexe}</Text>
                     
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 250, flex: 1 }} source={{uri:item.photoUtilisateur}} />
                </CardItem>
                <CardItem style={{alignSelf:'center'}}>
                  
                  <Text onPress= { this.information.bind(this,item.derniereFormation)}> </Text>
   <Button rounded warning  style={{marginLeft:3 , height:38}}><Text style={{fontSize:12}}> <MyIcon name="close" size = {18} color="#003366" /> Ignorer </Text></Button> 
   <Button rounded success style={{marginLeft:3 , height:38}}><Text style={{fontSize:12}}> <MyIcon name="star-o" size = {18} color="#003366" /> Sauvegarder </Text></Button> 
   <Button rounded info  style={{marginLeft:3 , height:38}}><Text style={{fontSize:12}}> <MyIcon name="heart-o" size = {18} color="#003366" /> Interesser </Text></Button> 
                </CardItem>
              </Card>
            } 
          />
        </View>
      
      </Container>
<AppFooter/>
</Drawer>
    );
  }
}

