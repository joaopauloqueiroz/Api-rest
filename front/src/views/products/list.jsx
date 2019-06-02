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
import Deleted from "components/Deleted"
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

  import {list, deleted} from "functions/products/"
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            alert: false,
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

removeItemArray (id) {
  let data = this.state.products
  let index = data.findIndex(item => item.id === id)
  data.splice(index, 1)

  this.setState({
    alert: false,
    products: data,
  })
}

onConfirm = async (id) => {
  await deleted(id)
  this.removeItemArray(id)
}

onCancel(){
  this.setState({
    alert: false,
  })
}
alertDelete(id){
  this.setState({
    alert: <Deleted 
    msg={'Tem serteza que deseja deletar este produto? '} 
    title={'ATENÇÃO'}
    values={id} 
    onConfirm={this.onConfirm.bind(this)}
    onCancel={this.onCancel.bind(this)}
    />
  })
}


  render() {
      const {classes} = this.props;
    return (
     <GridContainer className="container-form">
        {this.state.alert}
        <GridItem md={6}>
          <CardIcon color="warning">
          <Icon className="size_icons">list</Icon>
      </CardIcon>
      </GridItem>
      <GridItem md={6}>
        <div className="btn_create">
      <Button round color="danger" onClick={() => this.props.history.push('/create-product')}>
        {"CADASTRAR"}
      </Button>
        </div>
      </GridItem>
       <GridItem md={12}>
          <Table>
          <TableHead>
                  <TableRow>
                    <TableCell>NOME</TableCell>
                    <TableCell>PREÇO</TableCell>
                    <TableCell>QUANTIDADE</TableCell>
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
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <div className="actios-icons">
                    <div title="Editar item">
                      <Link to={{pathname: "/create-product", state: item}} >
                        <Icon>edit_outline</Icon>
                      </Link>
                    </div>
                    <div title="Deletar item" onClick={() => this.alertDelete(item.id)}>
                        <Icon>delete_outline</Icon>
                    </div>
                  </div>
                </TableCell>
                </TableRow>
                </TableBody>
              )
            })}
          </Table>
       </GridItem>
     </GridContainer>
    )
  }
}

export default withStyles(regularFormsStyle)(List)