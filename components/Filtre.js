import React, { Component } from 'react';
import { Image , AsyncStorage, StyleSheet, View, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import TagInput from 'react-native-tag-input';
import { Router, Scene, Actions} from 'react-native-router-flux';
import { Container, Header,Body, Content, Form, Item, Input ,Button, Text, Thumbnail, Icon ,CheckBox, InputGroup, List , Card ,Spinner, ListItem} from 'native-base';
import AutoTags from 'react-native-tag-autocomplete';

import MyIcon from 'react-native-vector-icons/FontAwesome';


import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class Filtre extends Component {

  constructor(props){
    super(props)

this.state={

  data:[],
  centre:[],
  loading:false,
  checked:false,
  checked1:false,
  cdi:'false',
  checked2:false,
   localisation:'',
  tagsSelected: [],
  text:'',
  tags: '',

  

  
    }
}


checkboxTest(value) {

  this.setState({checked:!this.state.checked })


}

checkbox1 () {
this.setState({ checked1:!this.state.checked1})

}

checkbox2 () {
this.setState({checked2:!this.state.checked2})

}
  getDonnesUtilisateurs(){

  return fetch('http://192.168.0.96:1337/lireTags').
  then((Response)=>Response.json()).
  then((data)=>

{
  
  this.setState({suggestions:data })}

    )
}
  findFiltre(cdd,cdi,stage) {

  if(cdd == true && cdi == false && stage==false) {

    alert("cdd")
  }
else if (cdd==true && cdi==true && stage ==false ) {alert("cdd + cdi")} 

else if(stage ==true && cdi==true && cdd ==true) {alert("read all")}
 
else if(cdd==false && cdi ==true && stage==true) { alert("cdi+stage")} 

else if(cdd == false && cdi == true && stage==false) {alert("cdi")}
else if(cdd == false && cdi == false && stage==true) {alert("stage")}
else if(cdd == false && cdi == false && stage==false) {alert("false all")}
else if(cdd == true && cdi == false && stage==true) {alert("cdd + stage")}  

  } // fin fct



componentWillMount(){


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

 

 

<Form>
        
<Card>
          
 <Text style={{alignSelf:'center'}}>   <MyIcon name="search" size={15}/> Mes criteres de recherche </Text>
<Item last>
               <Text>    <MyIcon name="location-arrow" size = {20}/> &nbsp;  </Text>
              <GooglePlacesAutocomplete
      placeholder='Votre localisation'
      minLength={2} // minimum length of text to searc
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
          width: '100%',
          marginTop: 15,
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
<Item>
  <List style={{flexDirection:'column', flexWrap: 'wrap', alignItems: 'flex-start' ,flexDirection:'row'}}>

  <Text>  CDD </Text>
            <ListItem>
              <CheckBox checked={this.state.checked} onPress= {()=>this.checkboxTest()}/>
            </ListItem>
  <Text>  CDI </Text>
            <ListItem>
                <CheckBox checked={this.state.checked1} onPress= {()=>this.checkbox1()}/> 
            </ListItem>

  <Text> Stage </Text>
            <ListItem>
             <CheckBox checked={this.state.checked2} onPress= {()=>this.checkbox2()}/> 
            </ListItem>
          </List>     
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
                       
                        placeholder="Chercher par centre interet"
                        filterData={this.customFilterData}
                        renderSuggestion={this.customRenderSuggestion}
                        renderTags={this.customRenderTags}

                        
                    />

</InputGroup>

                    
 
  
          

              </Item>

    




      </Card>    
  
          </Form>


 <Button block warning style={{marginTop: 15}} onPress= {function(){ this.findFiltre(this.state.checked,this.state.checked1,this.state.checked2) }.bind(this) }>
            <Text>Rechercher </Text>

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
       
        borderRadius: 30,
        padding: 8
    },

    autocompleteContainer: {
        flex: 1,
        left: 20,
      //position: 'absolute',
       // right: 20,
      //  top: 100,
        zIndex: 1,
         marginTop: 15,
    },

});

module.export= Filtre;