/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class AppSoory extends Component {
  render() {
    return (
      
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://192.168.57.1/IMAGES/bande-dessin%c3%a9e-triste-de-livre-43150971.jpg'}} />
                <Body>
                  <Text>Modifier votre centre interet afin de voir plus de formations</Text>
                  
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              
                <Image source={{uri: 'http://192.168.57.1/IMAGES/Reforme-Formation-professionnelle-2015.jpg'}} style={{height:200, width:400}}/>
            
            </CardItem>
           
          </Card>
       
    );
  }
}
 module.export= AppSoory;

