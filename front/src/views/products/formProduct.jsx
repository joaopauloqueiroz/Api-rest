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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

import {create, update, findOne} from "functions/products/"

class FormProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
            type: '',
            id: this.props.item.id,
            errors: [],
        }
    }

async createProduct(param) {
    if(this.state.id === undefined){
        const response = await create(this.state)
        let errors = response.data.errors || [];
        let permission = response.data.error || [];
        if(response.data.errors || response.data.error){
            this.setState({
                errors: errors,
                permission,
            })
            return false;
        }
        if(param){
            this.clearAll()
        }else{
            this.props.props.history.push('/list-products')
        }
    }else{
        let form = this.state;
        const resp = await update(form)
        this.props.props.history.push('/list-products')
    }
}

clearAll(){
    this.setState({
        name: '',
        price: '',
        quantity: '',
        type: '',
        description: '',
        id: undefined,
    })
}

componentDidMount(){
    if(this.state.id){
       this.init(); 
    }
}
// componentDidUpdate(prevProps, prevState){
//     if(prevProps !== this.props){
//         if(this.props.id !== prevProps.id){
//             this.init();
//         }
//     }
// }

async init(){
    const response = await findOne(this.state.id)
    console.log(response)
}

  render() {
    const {classes} = this.props;
    const {name, price, quantity, description, errors} = this.state;
    return (
        <div>
        <Back />
        <br />
        <br />
        <GridContainer className="container-form">
        <GridItem md={12} xs={12} sm={12}>
            <CardIcon color="warning">
                <Icon>content_copy</Icon>
            </CardIcon>
        </GridItem>
        <GridItem md={12} xs={12} sm={12}>
        {this.state.errors.length > 0 ? (
        <div className="alert alert-danger">
            {this.state.errors.map((item, i) => {
                return (
                    <li key={item+i} >{item.msg}</li>
                )
            })}
            </div>
            ) : null}

            {this.state.permission ? (
                <div className="alert alert-danger">
                    {this.state.permission}
                </div>
            ) : null}

        </GridItem>
            <GridItem xs={12} sm={12} md={6}>
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
            <GridItem xs={12} sm={12} md={6}>
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
            <GridItem xs={12} sm={12} md={6}>
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

            <GridItem xs={12} sm={12} md={6}>
            <div className="form-group">
                <Select
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                    
                    fullWidth={true}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
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
                        {this.state.id === undefined ? <Icon>fiber_new</Icon> : <Icon>edit</Icon>}
                    </Button>
                    &nbsp;
                    {this.state.id === undefined ? (
                        <Button round color="danger" onClick={() => this.createProduct(true)}>
                        <Icon>add_circle</Icon>
                    </Button>
                    ) : null}
                </div>
            </GridItem>
        </GridContainer>
        </div>
        )
    }
}

export default withStyles(regularFormsStyle)(FormProduct)