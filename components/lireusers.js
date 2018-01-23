import React, {Component} from 'react';
import {Text,Image, ToastAndroid} from 'react-native';
import {Content,Card,CardItem, Body,Thumbnail , Left, Icon, Button , Drawer, Container,Header, Right} from 'native-base';
import HTMLVIEW from 'react-native-htmlview';
import SideBar from './menu';
import AutoTags from 'react-native-tag-autocomplete';
import AppSoory from './AppSoory';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './AppFooter';
import Swiper from 'react-native-swiper';
import { Router, Scene, Actions} from 'react-native-router-flux';

export default class Appusers extends Component  {

    constructor(props){
    super(props)
      

      this.state={

 data: [],
soory:false

  
  
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
var pdp = this.props.param2;

alert(id)
 return fetch('http://192.168.57.1:1337/Acceuils/Rencontre?id=5a420bdac2ba920b19d5f75b')
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

renderSoory() {
if(this.state.soory == true)
return(<AppSoory/>)

}
  test(){

    alert("a");
  }
ignorer(idEvents,index)
{

 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.57.1:1337/Ignorer/Evenement', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idEvenements:idEvents, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


  data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));


   this.setState({data:data2})
ToastAndroid.show('evenements ignorer', ToastAndroid.SHORT);
   if(this.state.data.length == 0) {

    this.setState({soory:true})
   }
  

})
.catch((err) => { console.log(err); });


}

sauvegarder(idEvents,index)
{
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.57.1:1337/Sauvegarder/Evenements', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({id:idEvents, idUtilisateurSauvegarder: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


  data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));


   this.setState({data:data2});
ToastAndroid.show('evenements sauvegarder', ToastAndroid.SHORT);
   if(this.state.data.length == 0) {

    this.setState({soory:true})
   }
  

})
.catch((err) => { console.log(err); });


}
participe(idEvents,index)
{
 
 

  idUtilisateur = this.props.param1;
  fetch('http://192.168.57.1:1337/Matcher/Evenement', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({id:idEvents, idUtilisateurParticipant: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {


  data2 = this.state.data.slice(index+1).concat(this.state.data.slice(0,index));

ToastAndroid.show('evenements ajouter', ToastAndroid.SHORT);
   this.setState({data:data2})

   if(this.state.data.length == 0) {

    this.setState({soory:true})
   }
  

})
.catch((err) => { console.log(err); });


}
render() {

let users=this.state.data.map(function(usersData, index){

return (



<Card key= {index}>

   
                <Image source={{uri: usersData.photoUtilisateur}} style={{height:200, width:400}}/>
               
<CardItem>
<Left>


<Body>

<MyIcon name ="chevron-right" size={30} style={{marginLeft:275}} onPress={this.test}/>
<Text>
{"\n"}

</Text> 


<Text>
<MyIcon name="map-marker" />{usersData.derniereFormation[0].diplome} <MyIcon name="graduation-cap" /> {usersData.localisation} <MyIcon name="institution" />{usersData.diplomeDeLivre} 
</Text>

<Text>
<MyIcon name="bookmark-o" /> {usersData.localisation} <MyIcon name="folder-open-o" />{usersData.localisation} 
</Text>

</Body>
</Left>
</CardItem>



      <CardItem style={{alignSelf:'center'}}>
             
          <Button bordered success onPress={function(){ this.participe(usersData.id,index) }.bind(this) }>
            <Text >Participer </Text>
          </Button>

     
          <Button bordered style={{marginLeft:3 }} onPress={function(){ this.sauvegarder(usersData.id,index) }.bind(this) }>
            <Text>Sauvegarder</Text>
          </Button>
               
         <Button bordered warning style={{marginLeft:3}} onPress={function(){ this.ignorer(usersData.id,index) }.bind(this) }>
            <Text>Ignorer</Text>
          </Button>

                </CardItem> 

</Card>

  )



},this);
return(
<Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} pdp={this.props.param2} id={this.props.param1} filtre={this.props.param3}/>}
        onClose={() => this.closeDrawer()} 

        >
    <Icon name='menu' onPress={()=> this.openDrawer()} style = {{color:'blue'}}/> 
{this.renderSoory()}
<Content>

{users}



</Content>
<AppFooter/>
</Drawer>
  );

}


}



module.export= Appusers;