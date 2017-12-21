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
import { Container, Drawer, Content,ListLeft,Body, ListItem, InputGroup, Input, Icon ,Text, Button,Card,CardItem,Thumbnail, DeckSwiper} from 'native-base';

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

renderAcc() {



  return (

<Container>
       
        <View>
          <DeckSwiper
            dataSource={this.props.cards}

            renderItem={item =>
              <Card style={{ elevation: 3, height:3000}}>
                <CardItem >
                  <Left>
                    <Thumbnail source={{uri:item.logo}} />

                 
                    <Body>
                      <Text>{item.nomInstitution}</Text>
                      <Text note>{item.titreEmploi}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody >
                 <Text>{item.description}</Text>
                </CardItem>
                <CardItem >
               
          <Button bordered success>
            <Text>Matcher</Text>
          </Button>

     
          <Button bordered style={{marginLeft:3}}>
            <Text>Sauvegarder</Text>
          </Button>
               
          <Button bordered warning style={{marginLeft:3}}>
            <Text>Ignorer</Text>
          </Button>

                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    )
}
  render() {

   

return (
  <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} data={this.props.data.id}/>}
        onClose={() => this.closeDrawer()} >
 
                <Card>
                <Button transparent onPress={()=> this.openDrawer()}>
              <Icon name='menu' />
            </Button>

                </Card>


                  </Drawer>
               

  )

   

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

