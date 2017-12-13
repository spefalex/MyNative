import React, { Component } from 'react';
import { Image , AsyncStorage, StyleSheet, View, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import TagInput from 'react-native-tag-input';
import { Router, Scene, Actions} from 'react-native-router-flux';
import { Container, Header, Content, Form, Item, Input ,Button, Text, Thumbnail, Icon , InputGroup, Card } from 'native-base';
import AutoTags from 'react-native-tag-autocomplete';
import UtilisateursFb from './UtilisateursFb';
var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class FormExample extends Component {

  constructor(props){
    super(props)

this.state={

  data:[],
  nom: '',
  url:'a',
  tagsSelected: [],
  text:'',
  avatarSource:null
  
    }
}





  getDonnesUtilisateurs(){

  return fetch('http://192.168.57.1:1337/lireTags').
  then((Response)=>Response.json()).
  then((data)=>

{
  
  this.setState({suggestions:data })}

    )
}

  show(){
    ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
  }
});
  }


showImageNew(){

  return(
<View>
<Image
source= {this.state.avatarSource}
style={{height:200, width:400}}

/>
 
 <TouchableOpacity onPress={this.show.bind(this)}>
     <Text>
     Changer photo
     </Text>

     
     </TouchableOpacity>
    </View>
    );
}
showImageFb(){

return(
<View>
<Image
source={{uri: this.state.url}}
style={{width:400, height:200}}
 />

 <TouchableOpacity onPress={this.show.bind(this)}>
     <Text>
     Changer photo
     </Text>

     
     </TouchableOpacity>
    </View>
    );

}


getDonnesUtilisateurFb(){

var id =this.props.param;
return fetch('https://graph.facebook.com/v2.11/me?fields=email,name,birthday,picture&access_token='+id)
.then((response)=> response.json())
.then((responseJson)=>{
var datasend= JSON.stringify(responseJson);
alert(responseJson.picture.data.url.toString());
var nom = responseJson.name.toString();
var url = responseJson.picture.data.url.toString();

this.setState({data:datasend, nom:nom , url:url});
//alert(data.name);

})
.catch((error)=> {
console.error(error);
  });

}



componentDidMount(){

this.getDonnesUtilisateurFb();
this.getDonnesUtilisateurs();

}


  customFilterData = query => {
        //override suggestion filter, we can search by specific attributes
   query = query.toUpperCase();
        let searchResults = this.state.suggestions.filter(s => {
            return (s.nomTags.toUpperCase().includes(query) ||
                s.nomTags.toUpperCase().includes(query));
        })
        return searchResults;
    }

    customRenderTags = tags => {
        //override the tags render
        return (
            <View style={styles.customTagsContainer}>
                {this.state.tagsSelected.map((t, i) => {
                    return (
                        <TouchableHighlight key={i} style={styles.customTag}
                            onPress={() => this.handleDelete(i)}>
                            <Text style={{ color: 'white' }}>{i}) {t.nomTags}</Text>
                        </TouchableHighlight>
                    )
                })}
            </View>
        );
    }

    customRenderSuggestion = suggestion => {
        
        const name = suggestion.nomTags;
        return (
            <Text>
                {name.substr(0, name.indexOf(' '))} - {suggestion.nomTags}
            </Text>
        )
}
showPdp(){

if(this.state.avatarSource == null) {

  return this.showImageFb();
}

else {

  return this.showImageNew();
}


}
handleDelete = index => {
        //tag deleted, remove from our tags array
        let tagsSelected = this.state.tagsSelected;
        tagsSelected.splice(index, 1);
        this.setState({ tagsSelected });
    }

    handleAddition = tagsSelected => {
        //suggestion clicked, push it to our tags array
        this.setState({ tagsSelected: this.state.tagsSelected.concat([tagsSelected]) });
}

  render() {


//var uri=null;


/*var urlImage = null;

if(this.state.avatarSource == null) {
   urlImage = this.state.url;
}    
else {
//urlImage = "http://sm.ign.com/ign_fr/screenshot/default/capture-decran-2015-10-16-a-203945_hsd1.jpg"
urlImage = this.state.avatarSource;
}*/
 
    return (



      <Container>
  
        <Content>



 

     
{this.showPdp ()}
   
     
          <Form>
<Card>
          
            <Item>
             <Icon name="ios-person" />
              <Input placeholder="Votre nom" value={this.state.nom} />
            </Item>
            <Item last>
             <Icon name="ios-person" />
              <Input placeholder="Prenom" />
            </Item>
            <Item last>
             <Icon name="paper" />
              <Input placeholder="E-mail" />
            </Item>
            <Item last>
             <Icon name="paper" />
              <Input placeholder="numero mobile"/>
            </Item>
            <Item last>
             <Icon name="paper" />
              <Input placeholder="sexe" />
            </Item>
            <Item last>
             <Icon name="paper" />
              <Input placeholder="anne de naissance" />
            </Item>

            
              <Item>
                            
            <Icon name="ios-unlock" />
         <Input placeholder="mot de passe" secureTextEntry={true} onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse} />
              </Item>
  <Item>
                            
            <Icon name="ios-unlock" />
         <Input placeholder="Confirmation de mot de passe" secureTextEntry={true} onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse} />
              </Item>


                  <Item last>
                   <Icon name="ios-person" />
              <Input  placeholder="Localisation" />
            </Item>

            
              
    <Item style={styles.autocompleteContainer}>
<Icon name="paper" />
 <InputGroup borderType='regular' >                  
      <AutoTags
                        //required
                        suggestions={this.state.suggestions}
                        tagsSelected={this.state.tagsSelected}
                        handleAddition={this.handleAddition}
                        handleDelete={this.handleDelete}
                        //optional
                        placeholder="Votre centre d'interet..."
                        filterData={this.customFilterData}
                        renderSuggestion={this.customRenderSuggestion}
                        renderTags={this.customRenderTags}
                    />

</InputGroup>
                    


              </Item>

    <Item last>
     <Icon name="ios-person" />
              <Input placeholder="Nom de votre societe actuelle" />
            </Item>

         <Item last>
              <Icon name="ios-person" />
              <Input placeholder="Votre poste" />
            
            </Item>

    <Item last>
     <Icon name="ios-person" />
              <Input placeholder="Votre dernier formation" />
            </Item>

    <Item last>
     <Icon name="ios-person" />
              <Input placeholder="anné" />
            </Item>
    <Item last>
     <Icon name="ios-person" />
              <Input placeholder="diplome" />
            </Item>


      </Card>    
  
          </Form>

 <Button block warning  >
            <Text>Sauvegarder</Text>

          </Button>

        </Content>

      </Container>


    );
  }
}

const styles = StyleSheet.create({
customTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#efeaea',
        
    },
    customTag: {
        backgroundColor: '#9d30a5',
        //justifyContent: 'center',
       // alignItems: 'center',
        height: 30,
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 30,
        padding: 8
    },

    autocompleteContainer: {
        flex: 1,
        left: 20,
      //position: 'absolute',
       // right: 20,
      //  top: 100,
        zIndex: 1
    },

});