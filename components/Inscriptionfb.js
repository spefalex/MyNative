import React, { Component } from 'react';
import { Image , AsyncStorage, StyleSheet, View, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import TagInput from 'react-native-tag-input';
import { Router, Scene, Actions} from 'react-native-router-flux';
import { Container, Header, Content, Form, Item, Input ,Button, Text, Thumbnail, Icon , Body ,InputGroup, Card ,Spinner,CheckBox,List,ListItem} from 'native-base';
import AutoTags from 'react-native-tag-autocomplete';
import UtilisateursFb from './UtilisateursFb';
import RNFetchBlob from 'react-native-fetch-blob';
import MyIcon from 'react-native-vector-icons/FontAwesome';


import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-datepicker';
import pick from './picker.js';

export default class FormExample extends Component {

  constructor(props){
    super(props)

this.state={

  data:[],
  nomUtilisateur: '',
  prenomUtilisateur:'',
  sexe:'',
  centre:[],
  trueSexe:'',
  loading:false,
  ConfirmmotDePasse:'',
  numeroMobile:'',
  adresseMail:'',
  motDePasse:'',
  typeRencontre:'',
  localisation:'',
  poste:'',
  nomSociete:'',

  diplome:'',
  filiere:'',
  nomEtablissement:'',
  anneNaissance:'',
  url:'a',
 
  tagsSelected: [],
  text:'',
  avatarSource:null,
  
  dataimage:null,

  tags: '',

  urlhome:'',
  checked:false,
  checked1:false,

  
    }
}





  getDonnesUtilisateurs(){

  return fetch('http://192.168.0.96:1337/lireTags').
  then((Response)=>Response.json()).
  then((data)=>

{
  
  this.setState({suggestions:data })}

    )
}




showImageNew(){

  return(
<View>
<Image
 source= {this.state.avatarSource}
//source={require ('../img/logo.png')}
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
 <Text> Changer photo  </Text>
     <MyIcon name="camera" size={15}/>


     
     </TouchableOpacity>
    </View>
    );

}

checkboxTest(value) {

  this.setState({checked:!this.state.checked , checked1:false })


}

checkbox1 () {
this.setState({ checked1:!this.state.checked1, checked:false})

}
getDonnesUtilisateurFb(){

var id =this.props.param;
return fetch('https://graph.facebook.com/v2.11/me?fields=email,name,birthday,picture&access_token='+id)
.then((response)=> response.json())
.then((responseJson)=>{
var datasend= JSON.stringify(responseJson);

var nom = responseJson.name.toString();
var url = responseJson.picture.data.url.toString();

this.setState({data:datasend, nom:nom , url:url});
//alert(data.name);

})
.catch((error)=> {
console.error(error);
  });

}


renderButton(){

  if(this.state.loading){

    return <Spinner size="large"/>;
  }

  return (

 <Button block warning  onPress={function(){ this.upload(this.state.checked,this.state.checked1) }.bind(this) } >
            <Text>Sauvegarder</Text>

          </Button>
    );
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
                            onPress={() => this.handleDelete(i)} >
                            <Text style={{ color: 'white' }} >{i}) {t.nomTags}</Text>
                        </TouchableHighlight>
                    )
                })}
            </View>
        );
    }


    getValueTags = tags => {
       
       var objects = this.state.tagsSelected;
     for(var key in objects) {
    return value  = objects[key].nomTags;
}
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


 
    return (



      <Container>
  
        <Content>

     
{this.showPdp ()}
   

     
          <Form>
<Card>
          
            <Item>
             <MyIcon name="user-circle" size = {20}/>
              <Input placeholder="Votre nom" value={this.state.nom} onChangeText={(nom)=>this.setState({nom})} />
            </Item>
            <Item last>
             <MyIcon name="user-circle" size = {20} />
              <Input placeholder="Prenom" onChangeText={(prenomUtilisateur)=>this.setState({prenomUtilisateur})} value={this.state.prenomUtilisateur} />
            </Item>


            <Item last>
              <MyIcon name="envelope-o" size={20} color="#900" />
              <Input placeholder="E-mail" onChangeText={(adresseMail)=>this.setState({adresseMail})} value={this.state.adresseMail}/>
            </Item>
            <Item last>
              <MyIcon name="mobile" size={20} color="#900" />
              <Input placeholder="numero mobile" onChangeText={(numeroMobile)=>this.setState({numeroMobile})} value={this.state.numeroMobile}/>
            </Item>
            <Item last>
             <MyIcon name="transgender" size= {20} />
            <Text> Sexe: </Text>

            </Item>

            <Item>
  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}}>

  <Text> Homme </Text>
            <ListItem>
              <CheckBox checked={this.state.checked} onPress= {()=>this.checkboxTest()}/>
            </ListItem>
  <Text>  Femme </Text>
            <ListItem>
                <CheckBox checked={this.state.checked1} onPress= {()=>this.checkbox1()}/> 
            </ListItem>

  
          </List>     
  </Item>


            <Item last>
           
        <DatePicker
        style={{width: 700}}
        date={this.state.date}
        mode="date"
        placeholder="Votre date de naissance"
        format="DD-MM-YYYY"
        
        confirmBtnText="Confirmer"
        cancelBtnText="Annuler"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
           marginRight:300
          }
          // ... You ca check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
            </Item>

            
              <Item>
                            
            <Icon name="ios-unlock" size={20}/>
         <Input placeholder="mot de passe" secureTextEntry={true} onChangeText={(motDePasse)=>this.setState({motDePasse})} value={this.state.motDePasse} />
              </Item>
  <Item>
                            
            <Icon name="ios-unlock" size = {20}/>
         <Input placeholder="Confirmation de mot de passe" secureTextEntry={true} onChangeText={(ConfirmmotDePasse)=>this.setState({ConfirmmotDePasse})} value={this.state.ConfirmmotDePasse} />
              </Item>


                  <Item last>
                   <MyIcon name="location-arrow" size = {20}/>
               <GooglePlacesAutocomplete
      placeholder='Votre localisation'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}

   
     renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data , details);

        this.setState({localisation:data.description})
      }}

      


      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyD7DJY8PslfvP80LUUCf8cg0Ha8ESSrZj4',
        language: 'fr', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      
      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      

      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
     

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    
     
    />

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
     <MyIcon name="institution" size = {20} />
              <Input placeholder="Nom de votre societe actuelle" 

        onChangeText={(nomSociete)=>this.setState({nomSociete})} value={this.state.nomSociete}
              />
            </Item>

         <Item last>
              <MyIcon name="suitcase" size = {20}/>
              <Input placeholder="Votre poste" 


        onChangeText={(poste)=>this.setState({poste})} value={this.state.poste}

              />
            
            </Item>

    <Item last>
     <MyIcon name="graduation-cap" size = {20}/>
              <Input placeholder="Filiere de votre dernier formation"

       
               />
            </Item>

    <Item last>
     <MyIcon name="institution" size = {20} />
              <Input placeholder="nom d'établissement"

 onChangeText={(nomEtablissement)=>this.setState({nomEtablissement})} value={this.state.nomEtablissement}
               />
            </Item>
    <Item last>
     <MyIcon name="certificate" size = {20} />
              <Input placeholder="votre diplome actuel"
 onChangeText={(diplome)=>this.setState({diplome})} value={this.state.diplome}
               />
            </Item>


      </Card>    
  
          </Form>

{this.renderButton()}
        </Content>

      </Container>


    );



  }


  show(){
pick((source,dataimage )=> this.setState({avatarSource:source, dataimage:dataimage }));
  }



upload(male,female) {

if(male == true && female ==false) {

  this.setState({trueSexe:'male'})
} else {this.setState({trueSexe:'female'})}


var tagsValue = JSON.stringify(this.state.tagsSelected);

var count = this.state.tagsSelected.length;

var liste = [];
for(var i =0; i<count; i++)

{
  var tagsPeople = this.state.tagsSelected[i].nomTags;
 
 liste.push(tagsPeople).toString();

}

this.setState({centre:JSON.stringify(liste)})



var tagis = liste.toString();

var daty = this.state.date;
var year = daty.substring(daty.lastIndexOf("-")+1);


if(this.state.dataimage) {
this.setState({loading:true})
RNFetchBlob.fetch('POST', 'http://192.168.0.96:1337/testtest', {
Authorization : "Bearer access-token",
otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, 

[{ name : 'info', data: 'spexe'},

  { name: 'avatar', filename : 'avatar.png', data:this.state.dataimage}])

    .then((response) => JSON.stringify(response.json())) 
.then((responseData) => {




      
var urlUpload=responseData.toString().replace(/"/g, "");
var urlOfIMAGE = 'http://192.168.0.96/IMAGES/'+urlUpload.substr(urlUpload.lastIndexOf('/') + 1);






fetch('http://192.168.0.96:1337/utilisateurs/Inscrire', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({nomUtilisateur: this.state.nom,prenomUtilisateur:this.state.prenomUtilisateur, centreInteret:tagis, adresseMail:this.state.adresseMail, photoUtilisateur:urlOfIMAGE, localisation:this.state.localisation, anneNaissance:year,nomSociete:this.state.nomSociete,poste:this.state.poste, numeroMobile: this.state.numeroMobile, nomEtablissement:this.state.nomEtablissement, sexe:this.state.trueSexe,diplome:this.state.diplome, motDePasse:this.state.motDePasse})
})
.then((response) => response.json()) 
.then((responseData) => {
this.setState({loading:false})
if(responseData.message == 'email de confirmation'){

  
Actions.confirmation({param1:responseData.idUtilisateur});
} else  {

  alert(responseData.message);
}

 })
.catch((err) => { console.log(err); });

    

    
  }).catch((err) => {


    console.log(err);
    
  });
} 

//load image direc

else {

alert('fb')

this.setState({loading:true})

     fetch('http://192.168.0.96:1337/utilisateurs/Inscrire', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({nomUtilisateur: this.state.nom,prenomUtilisateur:this.state.prenomUtilisateur, centreInteret:tagis, adresseMail:this.state.adresseMail, photoUtilisateur:this.state.url, localisation:this.state.localisation, anneNaissance:year,nomSociete:this.state.nomSociete,poste:this.state.poste, numeroMobile: this.state.numeroMobile, nomEtablissement:this.state.nomEtablissement, sexe:this.state.trueSexe,diplome:this.state.diplome, motDePasse:this.state.motDePasse})
})
.then((response) => response.json()) 
.then((responseData) => {
 
 
 this.setState({loading:false})
if(responseData.message == 'email de confirmation'){

  
Actions.confirmation({param1:responseData.idUtilisateur});
} else  {

  alert(responseData.message);
}





 })
.catch((err) => { console.log(err); });

}

}

uploadi() {

RNFetchBlob.fetch('GET', this.state.url, {
    Authorization : 'Bearer access-token...',
    // more headers  ..
  })
  // when response status code is 200
  .then((res) => {
    // the conversion is done in native code
    let base64Str = res.base64()
    // the following conversions are done in js, it's SYNC
    let text = res.text()
    let json = res.json()

    alert(res)

  })
  // Status code is not 200
  .catch((errorMessage, statusCode) => {
    // error handling
  })


}
login = () => {
  
     fetch('http://192.168.0.96:1337/utilisateurs/Inscrire', {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify({eMail:"solo"})
})
.then((response) => response.json()) 
.then((responseData) => {
 

alert(responseData);





 })
.catch((err) => { console.log(err); });


    };
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