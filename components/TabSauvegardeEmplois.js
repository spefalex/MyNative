/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */



import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs ,TabHeading, Icon, Text} from 'native-base';
import Tab1 from './emploiSauvegarde';
import Tab2 from './EmlpoiMatcherList';
import AppSoory from './AppSoory';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AppFooter from './FooterDetailsOffres';
import Swiper from 'react-native-swiper';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  AppRegistry,

} from 'react-native';
export default class TabsEmplois extends Component {

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
      



     <Tabs style= {{backgroundColor:"#ffcccc"}} >
          <Tab heading={ <TabHeading><Icon name="bookmarks" /><Text>Sauvegarder</Text></TabHeading>}  >
            <Tab1 param1={this.props.param1}/>
          </Tab>
          <Tab heading={ <TabHeading><Text>Matcher</Text></TabHeading>}>
             <Tab2 param1={this.props.param1} />
          </Tab>
         
        </Tabs>


       
      </Container>
    );
  }

  
}


AppRegistry.registerComponent('TabsEmplois', () => TabsEmplois);
