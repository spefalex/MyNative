import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
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


const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });



 

export default class PopupDialogExample extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      generalStarCount: 0,
      customStarCount: 1,
      rating:'',
      data:[],
      data2:[]
      
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
 

}



  render() {
   
    return (



<View>
       
   <Text
        
          onPress={this.showSlideAnimationDialog}
      >
Test
      </Text>

       <Text
        
          onPress={this.showVals}
      >
Test
      </Text>
        

        <PopupDialog
          dialogTitle={<DialogTitle title="Votre avis sur institutions" />}
          ref={(popupDialog) => {
            this.slideAnimationDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View>

            <Thumbnail source={{uri: this.props.pdp}} />
            <Item floatingLabel>
              <Label> Avis</Label>
              <Input />
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
<Text> {this.state.customStarCount}</Text>

<Button onPress={this.valueStar(this.state.customStarCount)} style={{marginBottom:5}}>
            <Text>Click Me! </Text>
          </Button>
          </View>
        </PopupDialog>

      </View>
    );
  }
}