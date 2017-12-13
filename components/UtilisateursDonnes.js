/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HTMLView from 'react-native-htmlview';
import SideBar from './menu';
import {
  AppRegistry,
  StyleSheet,
 View
} from 'react-native';
import { Container, Drawer, Content, List, ListItem, InputGroup, Input, Icon ,Text, Button,Card,CardItem,Body,Thumbnail} from 'native-base';

export default class UtilisateursDonnes extends Component {


    constructor(props)
    {
        super(props);

    }
  


closeDrawer() {
      this._drawer._root.close()
    }
openDrawer() {
      this._drawer._root.open()
    }

  render() {

   

return (
  <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()} >
 
                <Card>
                <Button transparent onPress={()=> this.openDrawer()}>
              <Icon name='menu' />
            </Button>
<CardItem>
<Body>



  <Text>{this.props.data.age}</Text>
    <Text>{this.props.data.nomUtilisateur} </Text>

</Body>

</CardItem>
                </Card>
                  </Drawer>
               

  )

   
    return (
      
 <Container>
        

      





 </Container>
 
    );
  }

    
}



const styles = StyleSheet.create({
  bodyText : {
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color:'red',
  },

});



 module.export= UtilisateursDonnes;

