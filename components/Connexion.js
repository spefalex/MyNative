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
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

export default class Connexion extends Component {
  render() {
     return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='nom utilisateur' onChangeText={(nomUser)=>this.setState({nomUser})} value={this.state.nomUser} />
                <TextInput secureTextEntry={true} placeholder='mot de passe' onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse}  />
                <View style={{margin:7}} />
                <Button 
                        onPress={this.login}
                        title="Se connecter"
                    />
 
      
                </ScrollView>
            );
  }

   constructor(props){

        super(props);
        this.state={nomUser:'', motDePasse:''};
    }
    login = () => {

     fetch('http://192.168.56.1:1337/Log', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({eMail:this.state.nomUser, motDePasse: this.state.motDePasse})
})
.then((response) => response.json()) 
.then((responseData) => { console.log("response: " + responseData); if(responseData.message){
    alert(responseData.message);
} else { 


  alert(responseData.token);



}





 })
.catch((err) => { console.log(err); });


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

module.export=Connexion;