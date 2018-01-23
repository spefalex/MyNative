import React, {Component} from 'react';
import {Text} from 'react-native';
import {Content,Card,CardItem, Body,Thumbnail , Left, Icon, Button , Drawer} from 'native-base';
import HTMLVIEW from 'react-native-htmlview';
import SideBar from './menu';
import AppSoory from './AppSoory';

import { Router, Scene, Actions} from 'react-native-router-flux';

export default class AppFormations extends Component  {

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



  return fetch('http://192.168.0.96:1337/Acceuils/Formations?id='+id)
    .then(response => response.json())
    .then(responseJson => {

if(responseJson.message) {


this.setState({soory:true})

}

  else {

 this.setState({data:responseJson.formations})

 
   }
    })
    .catch(error => {
      console.error(error);
    });

} 

renderSoory() {
if(this.state.soory == true)
return(<AppSoory/>)

}

  componentDidMount() {

    this.getData();
  }


  test(){

    alert("a");
  }
ignorer(idFormation)
{
  idUtilisateur = this.props.param1;
  photo= this.props.param2;

  filtre=this.props.param3;
  alert(filtre)
 
  if(idFormation == null) {
    alert("vous pouvez modifier votre filtre pour plus des resulats")
  } else 

  {

  fetch('http://192.168.0.96:1337/Ignorer/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idFormation:idFormation, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {

  
 this.setState({message:'bien sauvegarder'})

Actions.formations({param1:idUtilisateur, param2:photo, param3:filtre});
})
.catch((err) => { console.log(err); });
}

}


sauvegarder(idFormation)
{
  idUtilisateur = this.props.param1;
  photo= this.props.param2;

  filtre=this.props.param3;
  alert(filtre)
 
  if(idFormation == null) {
    alert("vous pouvez modifier votre filtre pour plus des resulats")
  } else 

  {

  fetch('http://192.168.0.96:1337/Sauvegarder/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idFormation:idFormation, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {

  
 this.setState({message:'bien sauvegarder'})

Actions.formations({param1:idUtilisateur, param2:photo, param3:filtre});
})
.catch((err) => { console.log(err); });
}

}

participe(idFormation)
{
  idUtilisateur = this.props.param1;
  photo= this.props.param2;

  filtre=this.props.param3;
  alert(filtre)
 
  if(idFormation == null) {
    alert("vous pouvez modifier votre filtre pour plus des resulats")
  } else 

  {

  fetch('http://192.168.0.96:1337/Participe/Formation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({idFormation:idFormation, idUtilisateur: idUtilisateur})
})
.then((response) => response.json()) 
.then((responseData) => {

  
 this.setState({message:'bien sauvegarder'})

Actions.formations({param1:idUtilisateur, param2:photo, param3:filtre});
})
.catch((err) => { console.log(err); });
}

}

render() {

let formations=this.state.data.map(function(formationData, index){
return (



<Card key= {index}>
<CardItem>
<Left>

<Thumbnail source={{uri:formationData.logo}} />
<Body>
<Text style= {{color:"#0e76a8"}}>


Le diplome délivré est {formationData.diplomeDeLivre} avec type de formations {formationData.typeFormation} 
</Text>
<Icon name="md-time" />
<Text> Date debut le : 
{formationData.dateDebutFormation}

</Text>
</Body>
</Left>
</CardItem>

<CardItem content>

<HTMLVIEW value={formationData.descriptionFormation}/>
</CardItem>

      <CardItem style={{alignSelf:'center'}}>
             
          <Button bordered success onPress={function(){ this.participe(formationData.id) }.bind(this) }>
            <Text >Participer </Text>
          </Button>

     
          <Button bordered style={{marginLeft:3 }} onPress={function(){ this.sauvegarder(formationData.id) }.bind(this) }>
            <Text>Sauvegarder</Text>
          </Button>
               
         <Button bordered warning style={{marginLeft:3}} onPress={function(){ this.ignorer(formationData.id) }.bind(this) }>
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

{formations}

</Content>
</Drawer>
  );

}


}



module.export= AppFormations;