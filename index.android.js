/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Connexion from './components/Connexion';
import AppHeader from './components/header';

import AppFooter from './components/footer';
import HomeScreen from './components/menu';
import SideBar from './components/SideBar';
import AppBody from './components/body'; 
import Inscriptionfb from './components/Inscriptionfb';
import Inscription from './components/Inscription';
import Aktest from './components/Acceuil';

import Confirmation from './components/confirmation';
import BadgeExample from './components/badhe';
import MenuComponent from './components/Acceuil';
import UtilisateursBody from './components/UtilisateursConnecte';
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import getTheme from './native-base-theme/components';
import { Router, Scene, Actions} from 'react-native-router-flux';
import commonColor from './native-base-theme/variables/commonColor';
import { Container ,StyleProvider } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MyNative extends Component {


   render() {
     return (

      <StyleProvider style={getTheme(commonColor)}>
           <Container>
<AppHeader/>

     <Router >
        <Scene key="root">
          <Scene key="login" component={AppBody} title="Login" hideNavBar={true} initial={true}/>
          <Scene key="badhe" component={BadgeExample} hideNavBar={true} title="Home"/>
          <Scene key="homescreen" component={HomeScreen} hideNavBar={true} title="Home"/>
          <Scene key="home" component={UtilisateursBody} hideNavBar={true} title="Home"/>
          <Scene key="side" component={SideBar} hideNavBar={true} title="Home"/>
          <Scene key="insriptionfb" component={Inscriptionfb} hideNavBar={true} title="Home"/>
             <Scene key="insription" component={Inscription} hideNavBar={true} title="Home"/>
          <Scene key="confirmation" component={Confirmation} hideNavBar={true} title="Confirmation"/>
           <Scene key="acceuil" component={Aktest} hideNavBar={true} title="Confirmation"/>
        </Scene>
      </Router>


           
     
                     

               
            </Container>
      </StyleProvider>
            );
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

AppRegistry.registerComponent('MyNative', () => MyNative);
