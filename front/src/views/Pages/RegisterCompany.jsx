import React from "react";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import Body from "./Body";
import CardHeader from "components/Card/CardHeader.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from 'axios'

import {
  registerCompanyJX,
} from "variables/language.jsx";


axios.defaults.withCredentials = true;
class RegisterCompany extends React.Component {
  
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Card>
            <CardHeader>
              <h2 className={classes.cardTitle} style={{color: "black", textAlign: "center"}}>{registerCompanyJX.cadastrarEmpresa}</h2>
              <Body />
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(RegisterCompany);
