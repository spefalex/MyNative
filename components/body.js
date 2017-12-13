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
import {
  AppRegistry,
  StyleSheet,
 View
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon ,Text, Button, Spinner } from 'native-base';

export default class AppBody extends Component {

 
  
  render() {    

  return (
 <Container>

    
                <Content>
       
                    <List>
                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-person" />
                                <Input placeholder="Identification" onChangeText={(nomUser)=>this.setState({nomUser})} value={this.state.nomUser}  />
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Icon name="ios-unlock" />
                                <Input placeholder="mot de passe" secureTextEntry={true} onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse} />
                            </InputGroup>
                        </ListItem>

                    </List>
    <Button block light  onPress={this.login} >
            <Text>Se conecter</Text>

          </Button>



<Text>
{"\n"}

</Text>

      
 <Button rounded  onPress={this.fbAuth} style={styles.welcome}>
            <Text>connecter par facebook</Text>
          </Button>
<Text style={styles.welcome}>
Ou{"\n"}

</Text>
 <Button rounded info style={styles.welcome}>
            <Text>se conneter par Linkidin</Text>
          </Button>
      

                </Content>
            </Container>
  
    );
  }

 constructor(props){

        super(props);
        this.state={nomUser:'', motDePasse:''};

    }

 
    login = () => {
  
     fetch('http://172.19.0.1:1337/Log', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({eMail:this.state.nomUser, motDePasse: this.state.motDePasse})
})
.then((response) => response.json()) 
.then((responseData) => { console.log("response: " + responseData); if(responseData.message =='OK'){


Actions.home({param1:responseData.utilisateurs});

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

  },
 
});



 module.export= AppBody;

