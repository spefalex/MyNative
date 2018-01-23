import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import { Router, Scene, Actions} from 'react-native-router-flux';
export default class FooterAction extends Component {

    constructor(props)
    {
        super(props);

           this.state={



  eventy:'',
  rencontre:'',
  formation:'',
  id:'',
  dataFormation: []
  
  
  
    }

    }



    componentWillReceiveProps() {

  this.verifFiltre();
 
}


getEmploiesSauvegarde(idUtisateur) {

Actions.offreSave({param1:idUtisateur});

} 

filtreEmploie () {

  Actions.filtre();
}
verifFiltre() {

if(this.props.filtre == 'rencontre feat emploies') {


  this.setState({rencontre:'#FF0000'})

}


 else if(this.props.filtre == 'emploies feat evenements') {


  this.setState({eventy:'#FF0000'})
 }

 else if(this.props.filtre == 'emploies feat formation') {


  this.setState({formation:'#FF0000'})
 }

 else if(this.props.filtre == 'read all') {


  this.setState({formation:'#FF0000', eventy:'#FF0000', rencontre:'#FF0000'})
 }


else if(this.props.filtre == 'rencontre feat emploies feat evenements') {


  this.setState({rencontre:'#FF0000', eventy:'#FF0000'})
 }


else if(this.props.filtre == 'formation feat emplois feat evenements') {


  this.setState({formation:'#FF0000', eventy:'#FF0000'})
 }



else if(this.props.filtre == 'rencontre feat emploies feat formation') {


  this.setState({formation:'#FF0000', rencontre:'#FF0000'})
 }

  }
  render() {
    return (
    
        <Footer>
          <FooterTab>
            <Button vertical>
             <Button info><Text> Info </Text></Button>
            </Button>

             
             <Button vertical>
               <Button warning><Text> Warning </Text></Button>
              
            </Button>
            <Button vertical>
           <Button danger><Text> Danger </Text></Button>
            
            </Button>
       
          </FooterTab>
        </Footer>
    
    );
  }
}

 module.export= FooterAction;