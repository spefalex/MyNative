import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ToastAndroid} from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogText,
  SlideAnimation,
  DialogButton,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';
import StarRating from 'react-native-star-rating';
import { Container, Header, Content, Button ,Form, Item, Input, Label , Thumbnail} from 'native-base';
import { Router, Scene, Actions} from 'react-native-router-flux';
import io from "socket.io-client/dist/socket.io.js";
import SocketIOClient from 'socket.io-client';


const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });



 
var e;
export default class PopupDialogExample extends Component {
 

  constructor(props) {
    super(props);
           e = this;

this.socket=io.connect("http://192.168.0.96:4444", { transports: ['websocket'] }, {pingTimeout: 30000});
console.ignoredYellowBox = [
    'Setting a timer'
]

    this.state = {
      generalStarCount: 0,
      customStarCount: 0,
      rating:'',
      data:[],
      data2:[],
      avis:'',
      insert:false
      
    };
    this.showSlideAnimationDialog = this.showSlideAnimationDialog.bind(this);
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating
    });

    
  }

  onCustomStarRatingPress(rating) {
    this.setState({
      customStarCount: rating,
    
    });


  }

 
  showSlideAnimationDialog() {
    this.slideAnimationDialog.show();
  }

valueStar(star) {
 pdp= this.props.pdp;
 idUser= this.props.idUser;
 prenom = this.props.prenom;
 logo=this.props.logo;
 note = star;
 institutions= this.props.institutions;
 if(star>1) {
 
  fetch('http://192.168.0.96:1337/Avis/Institution', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },



  body: JSON.stringify({pdp:pdp,idUtilisateur:idUser, idInstitution: institutions,prenomUtilisateurs:prenom,avis:this.state.avis,note:note})
})
.then((response) => response.json()) 
.then((responseData) => {


  Actions.detailsEntreprise({param1:institutions, param2:logo, param3:idUser,prenom:prenom,pdp:pdp});

this.socket.emit("sendAvis","a");
ToastAndroid.show('Commenatire publier', ToastAndroid.SHORT);


})
.catch((err) => { console.log(err); });
  }
}



  render() {
   
    return (



<View>

        

<View>

            <Thumbnail source={{uri:this.props.pdp}} /> 
            <Item floatingLabel>
              <Label> Votre avis  {this.props.prenom}</Label>
              <Input onChangeText={(avis)=>this.setState({avis})} value={this.state.avis}/>
            </Item>
           
          
<StarRating
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={this.state.customStarCount}
          selectedStar={(rating) => this.onCustomStarRatingPress(rating)}
          starColor={'red'}
          emptyStarColor={'blue'}
          size={5}
/>
<Text> {this.valueStar(this.state.customStarCount)}</Text>


<Button style={{marginBottom:5}}>
            <Text>Pas encore </Text>
          </Button>
          </View>
   

      </View>
    );
  }
}