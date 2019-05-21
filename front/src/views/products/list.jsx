import React, { Component } from 'react'

/**
 * @material-ui/core components
 */
import withStyles from "@material-ui/core/styles/withStyles";

/**
 * Components
 */
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

/**
 * EStilo css
 */
 import './css/index.css'
 import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

 /**
  * Functions
  */

  import {list} from "functions/products/"

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: []
        }
    }

componentDidMount(){
    
}

async listProducts() {
    const response  = await list()
    console.log(response)
}

  render() {
      const {classes} = this.props;
    return (
     <GridContainer className="container-form">
       <div>lista de produtos</div>
       
    
       <a onClick={() => this.props.history.push('/create-product')} >Cadastrar</a>
     </GridContainer>
    )
  }
}

export default withStyles(regularFormsStyle)(List)