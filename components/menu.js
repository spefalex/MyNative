import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Icon, Badge, Image ,Thumbnail} from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import MyIcon from 'react-native-vector-icons/FontAwesome';
export default class Menu extends Component {

  constructor(props)
    {
        super(props);

    }

  renderBack() {

    return(
 <Content>
      <Image source={require('../img/logo.png')}/>
    </Content>
    );
  }
  render() {
    return (
   
      <Content style={{ backgroundColor:'#2c3e50'}}>
      <View style={{backgroundColor:'#f4f6f7'}}>
 <Thumbnail source={{uri: this.props.pdp}} />
 </View>
      <List>
     
                        <ListItem iconLeft>
                            <MyIcon name='glass' size = {20} color="#a569bd"/>

<TouchableOpacity>
                            <Text style = {{marginLeft:15}}>Evenements </Text>
</TouchableOpacity>
                        </ListItem>
                        <ListItem iconLeft>
                            <MyIcon name='university' size = {20}  color="#5dade2"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Emploies</Text>
                            </TouchableOpacity>
                          
                        </ListItem>
                        <ListItem iconLeft>
                            <MyIcon name="graduation-cap" size = {20} color="#28b463"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Formation</Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem iconLeft iconRight>
                            <MyIcon name='meetup' size = {20} color="#f1948a"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Rencontre</Text>
                          </TouchableOpacity>
                        </ListItem>

                         <ListItem iconLeft iconRight>
                            <MyIcon name='wechat' size = {20} color="#0b5345"/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}} >Chat</Text>
                         </TouchableOpacity>  
                        </ListItem>
                          <ListItem iconLeft iconRight>
                            <Icon name='ios-notifications' size = {20}/>
                            <TouchableOpacity>
                            <Text style = {{marginLeft:15}}>Notification - Menu </Text>
                           </TouchableOpacity>
                        </ListItem>
                    </List>
      </Content>
    );
  }
}