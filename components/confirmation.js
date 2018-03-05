import React, { Component } from 'react';
import { Container,Spinner, List,ListItem,Card, Content, Form, Item, Input, InputGroup, Button , Text , Thumbnail,Image, Icon } from 'native-base';
import { Router, Scene, Actions} from 'react-native-router-flux';
export default class Confirmation extends Component {
  render() {
    return (
      <Container>
        
        <Content>
  <Text style= {{alignSelf: 'center',color:'green'}}>Bienvenu  { this.state.salutation } {this.state.pseudo} {"\n"} </Text> 
 
         <Card>
          <Thumbnail large source={{uri: this.state.imageUrl}} style={{alignSelf: 'center'}}/>
        
       
      <List>
                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-person" />
                                <Input placeholder="Identification" onChangeText={(nomUser)=>this.setState({nomUser})} value={this.state.mail}  />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-unlock" />
                                <Input placeholder="mot de passe" secureTextEntry={true} onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse} />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Icon name="grid" />
                                <Input placeholder="votre code de confirmation" onChangeText={(code)=>this.setState({code})} value={this.state.code} />
                            </InputGroup>
                        </ListItem>

                    </List>
                    </Card>
                    {this.renderButton()}
        </Content>
      </Container>
    );
  }

   constructor(props){

        super(props);
        this.state={nomUser:'', motDePasse:'', loading:false, code:'', idUser:'', imageUrl:'http',pseudo:'', salutation:'', 'mail':''};

    }

getDonnesUtilisateurs(){

var id = this.props.param1;
this.setState({idUser:id});
return fetch('http://192.168.0.96:1337/Informations/Utilisateur?id='+id)
.then((response)=> response.json())
.then((responseJson)=>{
var datasend=JSON.stringify(responseJson);


if(responseJson.utilisateur.sexe == 'male')
{this.setState({salutation:"Monsieur"})} else {this.setState({salutation:"Mademoiselle / Madame "})}
this.setState({mail:responseJson.utilisateur.adresseMail,imageUrl:responseJson.utilisateur.photoUtilisateur, pseudo:responseJson.utilisateur.prenomUtilisateur,salutation:this.state.salutation})

 

})
.catch((error)=> {
console.error(error);
  });

}

componentDidMount(){

this.getDonnesUtilisateurs();

}
renderButton(){

  if(this.state.loading){

    return <Spinner size="large"/>;
  }

  return (

          <Button block info onPress={this.ConfirmationCode}>
            <Text>COnfirmer</Text>
          </Button>
    );
}

    ConfirmationCode= () => {
  
 this.setState({loading:true})

     fetch('http://192.168.0.96:1337/Log/Confirmation', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({eMail:this.state.mail, motDePasse: this.state.motDePasse, code:this.state.code})
})
.then((response) => response.json()) 
.then((responseData) => {
 
 
 this.setState({loading:false})

 console.log("response: " + responseData); if(responseData.token){
//Actions.acceuil({param1:this.state.idUser,param2:this.state.imageUrl,prenom:this.state.pseudo});

Actions.infosup({param1:this.state.idUser,param2:this.state.imageUrl,prenom:this.state.pseudo});
} else { 

alert(responseData.message);



}





 })
.catch((err) => { console.log(err); });


    };
}

 module.export= Confirmation;