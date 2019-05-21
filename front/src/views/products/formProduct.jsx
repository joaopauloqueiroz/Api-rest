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
import Icon from "@material-ui/core/Icon";
import Back from 'components/back'

/**
 * EStilo css
 */
 import './css/index.css'
 import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

 /**
  * Functions
  */

  import {create} from "functions/products/"

class FormProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
        }
    }

async createProduct() {
    const response = await create(this.state)
    console.log(response)
}

componentDidMount(){

}

  render() {
      const {classes} = this.props;
      const {name, price, quantity, description} = this.state;
    return (
    <div>
    <Back />
    <br />
    <br />
     <GridContainer className="container-form">
     <GridItem md={12}>
        <CardIcon color="warning">
            <Icon>content_copy</Icon>
        </CardIcon>
     </GridItem>
        <GridItem xs={12} sm={2} md={6}>
            <CustomInput
                error={
                    this.state.error === "error" ||
                    this.state.emailState === "error"
                }
                labelText={'Nome do produto'}
                id="nome"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "name",
                    value: name,
                    placeholder: 'Nome completo do porduto',
                    onChange: e => this.setState({[e.target.name]: e.target.value})
                }}
            />
        </GridItem>
        <GridItem xs={12} sm={2} md={6}>
            <CustomInput
                error={
                    this.state.error === "error" ||
                    this.state.emailState === "error"
                }
                labelText={'Valor do produto'}
                id="valor"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "number",
                    name: "price",
                    value: price,
                    placeholder: 'Valor do porduto',
                    onChange: e => this.setState({[e.target.name]: e.target.value})
                }}
            />
        </GridItem>
        <GridItem xs={12} sm={2} md={6}>
            <CustomInput
                error={
                    this.state.error === "error" ||
                    this.state.emailState === "error"
                }
                labelText={'Quantidade produto'}
                id="valor"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "number",
                    name: "quantity",
                    value: quantity,
                    placeholder: 'Quantidade de produtos',
                    onChange: e => this.setState({[e.target.name]: e.target.value})
                }}
            />
        </GridItem>
        <GridItem xs={12} sm={2} md={12}>
            <CustomInput
                error={
                    this.state.error === "error" ||
                    this.state.emailState === "error"
                }
                labelText={'Descrição do produto'}
                id="nome"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    name: "description",
                    value: description,
                    placeholder: 'Descreva os detalhes do porduto',
                    onChange: e => this.setState({[e.target.name]: e.target.value})
                }}
            />
        </GridItem>
        <GridItem md={12} xs={12} sm={12}>
            <div className={classes.center}>
                <Button round color="danger" onClick={() => this.createProduct()}>
                    {"CADASTRAR"}
                </Button>
            </div>
        </GridItem>
     </GridContainer>
     </div>
    )
  }
}

export default withStyles(regularFormsStyle)(FormProduct)