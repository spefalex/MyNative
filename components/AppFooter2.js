import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import { Router, Scene, Actions} from 'react-native-router-flux';
export default class AppFooter extends Component {

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
 goHome(pdp,id) {

Actions.acceuil({param1:id, param2:pdp, prenom:this.props.prenom});

 }

getMenu(pdp,id) {


  Actions.menuList({pdp:pdp, id:id, prenom:this.props.prenom})
}

getEmploiesSauvegarde(idUtisateur) {

Actions.offreSave({param1:idUtisateur});

} 

filtreEmploie (idUtisateur) {

  Actions.filtre({param1:idUtisateur});
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
              <MyIcon name='sliders' size = {25}  color="#5dade2" onPress={this.filtreEmploie.bind(this,this.props.id)} />
        
            </Button>

             
             <Button vertical>
              <MyIcon name='check-circle-o' size = {25}  color="#5dade2" onPress={this.getEmploiesSauvegarde.bind(this,this.props.id)}/>
              
            </Button>
            <Button vertical>
              <MyIcon name='home' size = {25} color="#a569bd"  onPress= {this.goHome.bind(this,this.props.pdp,this.props.id)} />
            
            </Button>
            <Button >
              <MyIcon name="star-o" size = {25} color="#28b463" />
        
            </Button>
              
            <Button vertical>
              <MyIcon name="comments" size= {25} />
            </Button>

                <Button >
              <Icon name="menu" size = {25} color="#28b463" onPress= {this.getMenu.bind(this,this.props.pdp,this.props.id)} />
        
            </Button>
          </FooterTab>
        </Footer>
    
    );
  }
}

 module.export= AppFooter;