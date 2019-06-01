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
import {Link} from "react-router-dom"

/**
 * EStilo css
 */
 import './css/index.css'
 import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

 /**
  * Functions
  */

  import {list} from "functions/products/"
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: []
        }
    }

async componentDidMount(){
    await this.listProducts()
}

async listProducts() {
    const response  = await list()
    this.setState({
      products: response.data
    })
}

  render() {
      const {classes} = this.props;
    return (
     <GridContainer className="container-form">
       <GridItem md={12}>
       <CardIcon color="warning">
       <Icon className="size_icons">list</Icon>
     </CardIcon>
          <Table>
          <TableHead>
                  <TableRow>
                    <TableCell>NOME</TableCell>
                    <TableCell>PREÇO</TableCell>
                    <TableCell>DESCRIÇÃO </TableCell>
                    <TableCell>ACTION </TableCell>
                  </TableRow>
                </TableHead>
            {this.state.products.map((item, i) => {
              return (
                <TableBody key={item+i}>
                <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <div className="actios-icons">
                    <div title="Editar item">
                      <Link to={{pathname: "/create-product", state: item}} >
                        <Icon>edit_outline</Icon>
                      </Link>
                    </div>
                    <div title="Deletar item">
                    <Link to="/create-product" >
                        <Icon>delete_outline</Icon>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                </TableRow>
                </TableBody>
              )
            })}
          </Table>
       </GridItem>    
       {/* <a onClick={() => this.props.history.push('/create-product')} >Cadastrar</a> */}
     </GridContainer>
    )
  }
}

export default withStyles(regularFormsStyle)(List)