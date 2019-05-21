import React, { Component } from 'react'
/**
 * Components
 */
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

/**
 * @material-ui/core components
 */
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
/**
 * css
 */
import './index.css'
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class Index extends Component {
    render(){
        return (
            <GridContainer>
            <GridItem md={12}>
                <div className="btn_voltar" onClick={() => window.history.back()}>
                    <Icon>person</Icon>
                    <div>voltar</div>
                </div>
            </GridItem>
        </GridContainer>
        )
    }
}

export default withStyles(regularFormsStyle)(Index)