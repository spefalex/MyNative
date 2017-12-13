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
  View,Image
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
export default class AppHeader extends Component {
  render() {
    return (
    <Header>
     <Body>

 <Image source={require ('../img/logo.png')} style={{width:150, height:30}}/>
     </Body>
       
      </Header>
    );
  }
}
 module.export= AppHeader;

