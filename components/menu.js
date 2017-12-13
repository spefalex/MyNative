import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';
export default class Menu extends Component {
  render() {
    return (
      <Content style={{ backgroundColor:'#fdebd0'}}>
      <List>
                        <ListItem iconLeft>
                            <Icon name='ios-chatboxes' />
                            <Text>Simon Mignolet</Text>
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name='ios-alarm' />
                            <Text>Nathaniel Clyne</Text>
                          
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name='ios-notifications' />
                            <Text>Dejan Lovren</Text>
                            <Text note>Note here</Text>
                        </ListItem>
                        <ListItem iconLeft iconRight>
                            <Icon name='ios-mic' />
                            <Text>Mama Sakho</Text>
                            <Icon name='ios-mic-outline' />
                        </ListItem>
                    </List>
      </Content>
    );
  }
}