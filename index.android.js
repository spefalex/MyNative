/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Connexion from './components/Connexion';
import AppHeader from './components/header';

import AppFooter from './components/AppFooter';
import HomeScreen from './components/menu';
import SideBar from './components/SideBar';
import AppBody from './components/body'; 
import Rencontre from './components/rencontre'; 
import Swipetest from './components/swipetest'; 
import Inscriptionfb from './components/Inscriptionfb';
import Inscription from './components/Inscription';
import Aktest from './components/Acceuil';
import refresh from './components/refresh';
import Filtre from './components/Filtre';
import Tchat from './components/tchat';
//import LireOffreSave from './components/emploiSauvegarde';
import LireOffreSave from './components/TabSauvegardeEmplois';
import PopUp from './components/PopUp';
import Formationrefresh from './components/FormationRefresh';
import FinaleTest from './components/finaleTest';
import MenuList from './components/MenuList';
import DetailsInstitutions from './components/DetailsInstitutions';
import refra2 from './components/refra2';
import Confirmation from './components/confirmation';
import Formations from './components/Formations';
import Evenements from './components/evenements'; 
import LireRencontreSave from './components/TabRencontre';
import AppSoory from './components/AppSoory';
import BadgeExample from './components/badhe';
import DetailsOffres from './components/detailsOffres';
import DetailsRencontres from './components/detailsRencontre';
import DetailsRencontresDemande from './components/detailsRencontreDemande';
import DetailsContact from './components/detailsContact';
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
           <Scene key="refra" component={refresh} hideNavBar={true} title="Confirmation"/>
           <Scene key="refra2" component={refra2} hideNavBar={true} title="Confirmation"/>
           <Scene key="formations" component={Formations} hideNavBar={true} title="Confirmation"/>
           <Scene key="formation2" component={Formationrefresh} hideNavBar={true} title="Confirmation"/>
           <Scene key="rencontre" component={Rencontre} hideNavBar={true} title="Confirmation"/>
           <Scene key="evenements" component={Evenements} hideNavBar={true} title="Confirmation"/>
           <Scene key="detailsOffres" component={DetailsOffres} hideNavBar={true} title="Confirmation"/>
            <Scene key="detailsRencontre" component={DetailsRencontres} hideNavBar={true} title="Confirmation"/>
            <Scene key="detailsRencontreDemande" component={DetailsRencontresDemande} hideNavBar={true} title="Confirmation"/>
            <Scene key="detailsContact" component={DetailsContact} hideNavBar={true} title="Confirmation"/>
           <Scene key="offreSave" component={LireOffreSave} hideNavBar={true} title="Confirmation"/>
            <Scene key="rencontreSave" component={LireRencontreSave} hideNavBar={true} title="Confirmation"/>
           <Scene key="filtre" component={Filtre} hideNavBar={true} title="Confirmation"/>
           <Scene key="finale" component={FinaleTest} hideNavBar={true} title="Confirmation"/>
           <Scene key="menuList" component={MenuList} hideNavBar={true} title="Confirmation"/>
           <Scene key="soory" component={AppSoory} hideNavBar={true} title="Confirmation"/>
           <Scene key="detailsEntreprise" component={DetailsInstitutions} hideNavBar={true} title="Confirmation"/>
           <Scene key="avis" component={PopUp} hideNavBar={true} title="Confirmation"/>
            <Scene key="tchat" component={Tchat} hideNavBar={true} title="Confirmation"/>

          
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
