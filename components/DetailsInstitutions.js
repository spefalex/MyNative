/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */



import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs ,TabHeading, Icon, Text, Card, CardItem} from 'native-base';
import Tab1 from './informationsInstitutions';
import Tab2 from './detailsInstitutions';
import Tab3 from './avis';
import AppSoory from './AppSoory';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './FooterDetailsOffres';
import Swiper from 'react-native-swiper';
import { Router, Scene, Actions} from 'react-native-router-flux';

import {
  AppRegistry,
  Image
} from 'react-native';
export default class TabsInstitutions extends Component {

      constructor(props){
    super(props)
      

      this.state={

 data: [],
soory:false,
adresse:'',
ville:'',
nombre:''

  
  
         }
   }




  render() {

    return (
<Container>


<Image source={{uri:this.props.param2}} style={{height:100, width:400, alignSelf:'center', marginTop:3}}/>

     <Tabs style= {{backgroundColor:"#ffcccc"}} >
          <Tab heading={ <TabHeading><Icon name="bookmarks" /><Text>Informations</Text></TabHeading>}  >
            <Tab1 param1={this.props.param1}/>
          
          </Tab>
          <Tab heading={ <TabHeading><Text>Offres</Text></TabHeading>}>
             <Tab2 param1={this.props.param1} />
          </Tab>

           <Tab heading={ <TabHeading><Text>Avis</Text></TabHeading>}>
             <Tab3 param1={this.props.param1} idUser= {this.props.param3} prenom={this.props.prenom} pdp={this.props.pdp} logo={this.props.param2}/>
          </Tab>
         
        </Tabs>


       
      </Container>
    );
  }

  
}


AppRegistry.registerComponent('TabsInstitutions', () => TabsInstitutions);
