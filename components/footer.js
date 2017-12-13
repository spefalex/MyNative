/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,

  View,Image
} from 'react-native';
import { Container, Content, List, Footer, FooterTab, Input, Icon ,Text, Button} from 'native-base';
export default class AppFooter extends Component {
  render() {
    return (
 <Footer> 

    <FooterTab>
      <Button onPress={Actions.home}>
      <Icon name="apps"/>
      <Text>  A propos </Text>
      </Button>
      <Button activate onPress={Actions.aki}>
      <Icon name="navigate"/>
      <Text>Activate </Text>
      </Button>

       <Button activate onPress={Actions.insriptionfb}>
      <Icon name="person"/>
      <Text> Nous </Text>
      </Button>
      </FooterTab>
    </Footer>
    );
  }
}
 module.export= AppFooter;

