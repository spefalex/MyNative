/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import UtilisateursBody from './UtilisateursConnecte';
import AppFooter from './footer';
import FBSDK, { LoginManager ,LoginButton, AccessToken,  GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { Router, Scene, Actions} from 'react-native-router-flux';

import io from "socket.io-client/dist/socket.io.js";
import {
  AppRegistry,
  StyleSheet,
 View,
  TouchableOpacity
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon ,Text, Button, Spinner } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
export default class AppBody extends Component {

 
  
  render() {    

  return (
 <Container>

    
                <Content>
       
                    <List>
                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-person" />
                                <Input placeholder="Identification" onChangeText={(nomUser)=>this.setState({nomUser})} value={this.state.nomUser} />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-unlock" />
                                <Input placeholder="mot de passe" secureTextEntry={true} onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse} />
                            </InputGroup>
                        </ListItem>

                    </List>
  {this.renderButton()}




<TouchableOpacity onPress={Actions.insription}>
     <Text style={styles.inscrire}>
    Créer compte KeyMada 
     </Text>
</TouchableOpacity>

<TouchableOpacity onPress={Actions.descriformation}>
     <Text style={styles.inscrire}>
    Mot de passe oublié 
     </Text>
</TouchableOpacity>
<Text>
{"\n"}

</Text> 
      
 <MyIcon.Button name="facebook" backgroundColor="#3b5998" onPress={this.fbAuth} style={styles.welcome}>
  <Text style = {{color:'white'}}>  Se connecter par facebook </Text>
  </MyIcon.Button>


<Text style={styles.welcome}>
Ou{"\n"}

</Text>
<MyIcon.Button name="linkedin" backgroundColor="#0e76a8" style={styles.welcome}>
    <Text style={{fontFamily: 'Arial', fontSize: 15 , color:'white'}}>Se connecter par linkedIn</Text>
  </MyIcon.Button>
      

                </Content>

            </Container>
  
    );
  }

 constructor(props){

        super(props);
        this.state={nomUser:'', motDePasse:'', loading:false};

    }


renderButton(){

  if(this.state.loading){

    return <Spinner size="large"/>;
  }

  return (

  <Button block light  onPress={this.login} >
            <Text>Se conecter</Text>

          </Button>
    );
}
 
    login = () => {
  
 this.setState({loading:true})

     fetch('http://192.168.0.96:1337/Log', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({eMail:this.state.nomUser, motDePasse: this.state.motDePasse})
})
.then((response) => response.json()) 
.then((responseData) => {
 
 
 this.setState({loading:false})

 console.log("response: " + responseData); if(responseData.message =='OK'){


Actions.acceuil({param1:responseData.utilisateurs, param2:responseData.pdp, prenom:responseData.prenom});

} else { 

alert(responseData.message);



}





 })
.catch((err) => { console.log(err); });


    };




       fbAuth=()=> {
      LoginManager.logInWithReadPermissions(['public_profile']).then(
         function(result) {
            if (result.isCancelled) {
               alert('Authentification annule');
            } else {
           AccessToken.getCurrentAccessToken().then(
                  (data) => {


                    alert(data.accessToken.toString())
                   Actions.insriptionfb({param:data.accessToken.toString()})
                  }
                )

        }
          },
         function(error) {
            alert('Login fail with error: ' + error);
         }
      );
};



}



const styles = StyleSheet.create({
  bodyText : {
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color:'red',
  },
    welcome : {
    
alignSelf: 'center',

// textAlign: 'center'

  },

      inscrire : {
    
alignSelf: 'center',
color: '#7D7D7D',
fontSize : 15

  },
 
});



 module.export= AppBody;

